import { Inject, Injectable } from '@nestjs/common';
import { PaymentServiceInterface } from '../interface/payment.service.interface';
import { PaymentRepositoryInterface } from '../interface/payment.repository.interface';
import { PAYMENT_REPOSITORY } from '../payment.constant';
import { PaymentListEntity } from '../entity/payment.entity';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { PaymentFilterDto } from '../schema/payment-filter.schema';
import { exportExcelStream } from 'src/utils/excel/excel-export.util';
import { PassThrough } from 'stream';

@Injectable()
export class PaymentService implements PaymentServiceInterface {

  constructor(
    @Inject(PAYMENT_REPOSITORY) private readonly orderRepository: PaymentRepositoryInterface,
  ) { }

  async getAll(query: PaymentFilterDto): Promise<PaginationResponse<PaymentListEntity, PaymentFilterDto>> {
    const { page, limit, offset, search, status } = normalizePagination<PaymentFilterDto>(query);
    const orders = await this.orderRepository.getAll({ page, limit, offset, search, status }, { autoInvalidate: true });
    const count = await this.orderRepository.count({ search, status }, { autoInvalidate: true });
    return { data: orders, meta: { page, limit, total: count, search, status } };
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
