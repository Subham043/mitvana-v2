import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PaymentServiceInterface } from '../interface/payment.service.interface';
import { PaymentRepositoryInterface } from '../interface/payment.repository.interface';
import { PAYMENT_CACHE_KEY, PAYMENT_REPOSITORY } from '../payment.constant';
import { PaymentListEntity } from '../entity/payment.entity';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { PaymentFilterDto } from '../schema/payment-filter.schema';
import { exportExcelStream } from 'src/utils/excel/excel-export.util';
import { PassThrough } from 'stream';
import { ConfigService } from '@nestjs/config';
import { AppConfigType } from 'src/config/schema';
import { Orders } from 'razorpay/dist/types/orders';
import { Payments } from 'razorpay/dist/types/payments';
import { VerifyRazorpayPaymentDto } from '../schema/verify-payment.schema';
import { GetRazorpayPaymentInfoDto } from '../schema/get-payment-info.schema';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class PaymentService implements PaymentServiceInterface {

  constructor(
    @Inject(PAYMENT_REPOSITORY) private readonly orderRepository: PaymentRepositoryInterface,
    private readonly configService: ConfigService<AppConfigType>,
    private readonly cacheService: CacheService,
  ) { }

  async getAll(query: PaymentFilterDto): Promise<PaginationResponse<PaymentListEntity, PaymentFilterDto>> {
    const { page, limit, offset, search, status } = normalizePagination<PaymentFilterDto>(query);
    const cacheKey = `${PAYMENT_CACHE_KEY}:all:p:${page}:l:${limit}:o:${offset}:s:${search}:st:${status}`;
    const cachedPayments = await this.cacheService.get<PaginationResponse<PaymentListEntity, PaymentFilterDto>>(cacheKey);

    if (cachedPayments) {
      return cachedPayments;
    }

    const orders = await this.orderRepository.getAll({ page, limit, offset, search, status }, { autoInvalidate: true });
    const count = await this.orderRepository.count({ search, status }, { autoInvalidate: true });

    const result = { data: orders, meta: { page, limit, total: count, search, status } };
    await this.cacheService.set(cacheKey, result, [PAYMENT_CACHE_KEY, cacheKey]);
    return result;
  }

  async generateRazorpayOrder(order_id: string, amount: number): Promise<Orders.RazorpayOrder & { key: string }> {
    const key_id = this.configService.get('RAZORPAY_KEY_ID') as string;
    const Razorpay = require("razorpay");
    const instance = new Razorpay({
      key_id: key_id,
      key_secret: this.configService.get('RAZORPAY_KEY_SECRET'),
    });

    const order = await instance.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: order_id,
      payment_capture: true,
      partial_payment: false,
    }) as Orders.RazorpayOrder;

    if (!order) {
      throw new InternalServerErrorException("Failed to generate Razorpay order");
    }

    return { ...order, key: key_id };
  }

  async verifyRazorpayPayment(dto: VerifyRazorpayPaymentDto): Promise<boolean> {
    const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');

    return validatePaymentVerification({ order_id: dto.razorpay_order_id, payment_id: dto.razorpay_payment_id }, dto.razorpay_signature, this.configService.get<string>('RAZORPAY_KEY_SECRET') as string);
  }

  async getRazorpayPaymentInfo(dto: GetRazorpayPaymentInfoDto): Promise<Payments.RazorpayPayment> {
    const Razorpay = require("razorpay");
    const instance = new Razorpay({
      key_id: this.configService.get('RAZORPAY_KEY_ID'),
      key_secret: this.configService.get('RAZORPAY_KEY_SECRET'),
    });

    return await instance.payments.fetch(dto.razorpay_payment_id) as Payments.RazorpayPayment;
  }

  async exportPayments(query: PaymentFilterDto): Promise<PassThrough> {
    return exportExcelStream({
      sheetName: 'Payments',

      columns: [
        { header: 'ID', key: 'order_id', width: 30 },
        { header: 'Order Id', key: 'orderId', width: 30 },
        { header: 'Total Price', key: 'total_price', width: 30 },
        { header: 'Razorpay Order ID', key: 'razorpay_order_id', width: 20 },
        { header: 'Razorpay Payment ID', key: 'razorpay_payment_id', width: 20 },
        { header: 'Payment Status', key: 'status', width: 20 },
        { header: 'User ID', key: 'user_id', width: 20 },
        { header: 'User Name', key: 'name', width: 20 },
        { header: 'User Email', key: 'email', width: 20 },
        { header: 'Created At', key: 'createdAt', width: 20 },
        { header: 'Updated At', key: 'updatedAt', width: 20 },
      ],

      fetchBatch: async (offset, limit) => {
        const { page, search: searchString } = normalizePagination({
          page: 1,
          limit,
          search: query.search,
        })

        return this.orderRepository.getAll({
          page,
          limit,
          offset,
          search: searchString,
          status: query.status,
        })
      },

      mapRow: (payment) => ({
        order_id: payment.order_id,
        orderId: payment.order ? payment.order.orderId : "",
        total_price: payment.order ? payment.order.total_price : 0,
        razorpay_order_id: payment.razorpay_order_id,
        razorpay_payment_id: payment.razorpay_payment_id,
        status: payment.status,
        user_id: payment.order && payment.order.user ? payment.order.user.id : "",
        name: payment.order && payment.order.user ? payment.order.user.name : "",
        email: payment.order && payment.order.user ? payment.order.user.email : "",
        createdAt: payment.createdAt?.toISOString(),
        updatedAt: payment.updatedAt?.toISOString(),
      }),
    })
  }
}
