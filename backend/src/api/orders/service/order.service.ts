import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { OrderServiceInterface } from '../interface/order.service.interface';
import { OrderRepositoryInterface } from '../interface/order.repository.interface';
import { ORDER_REPOSITORY } from '../order.constant';
import { OrderInfoEntity, OrderListEntity } from '../entity/order.entity';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { OrderFilterDto } from '../schema/order-filter.schema';
import { OrderUpdateStatusDto } from '../schema/order-update-status.schema';
import { exportExcelStream } from 'src/utils/excel/excel-export.util';
import { PassThrough } from 'stream';

@Injectable()
export class OrderService implements OrderServiceInterface {

  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: OrderRepositoryInterface,
  ) { }

  async getAll(query: OrderFilterDto): Promise<PaginationResponse<OrderListEntity, OrderFilterDto>> {
    const { page, limit, offset, search, status, payment_status } = normalizePagination<OrderFilterDto>(query);
    const orders = await this.orderRepository.getAll({ page, limit, offset, search, status, payment_status }, { autoInvalidate: true });
    const count = await this.orderRepository.count({ search, status, payment_status }, { autoInvalidate: true });
    return { data: orders, meta: { page, limit, total: count, search, status, payment_status } };
  }

  async getById(id: string): Promise<OrderInfoEntity> {
    const order = await this.orderRepository.getById(id, { autoInvalidate: true });

    if (!order) throw new NotFoundException("Order not found");

    return order;
  }

  async updateOrderStatus(id: string, data: OrderUpdateStatusDto): Promise<OrderInfoEntity> {
    const orderById = await this.orderRepository.getById(id);

    if (!orderById) throw new NotFoundException("Order not found");

    const updatedOrder = await this.orderRepository.updateOrderStatus(id, data);

    if (!updatedOrder) throw new InternalServerErrorException('Failed to update order');

    return updatedOrder;
  }

  async exportOrders(query: OrderFilterDto): Promise<PassThrough> {
    return exportExcelStream({
      sheetName: 'Orders',

      columns: [
        { header: 'ID', key: 'id', width: 30 },
        { header: 'Order Id', key: 'order_id', width: 30 },
        { header: 'Products', key: 'products', width: 30 },
        { header: 'Total Price', key: 'total_price', width: 30 },
        { header: 'Discounted Price', key: 'discounted_price', width: 30 },
        { header: 'Tax', key: 'tax', width: 30 },
        { header: 'Shipping Charges', key: 'shipping_charges', width: 30 },
        { header: 'Is IGST Applicable', key: 'is_igst_applicable', width: 30 },
        { header: 'Status', key: 'status', width: 30 },
        { header: 'Cancellation Reason', key: 'cancellation_reason', width: 30 },
        { header: 'Payment Method', key: 'payment_method', width: 30 },
        { header: 'Paid At', key: 'paid_at', width: 30 },
        { header: 'Is Delivered', key: 'is_delivered', width: 10 },
        { header: 'Delivered At', key: 'delivered_at', width: 10 },
        { header: 'User ID', key: 'user_id', width: 20 },
        { header: 'User Name', key: 'name', width: 20 },
        { header: 'User Email', key: 'email', width: 20 },
        { header: 'Payment Status', key: 'razorpay_status', width: 20 },
        { header: 'Razorpay Order ID', key: 'razorpay_order_id', width: 20 },
        { header: 'Razorpay Payment ID', key: 'razorpay_payment_id', width: 20 },
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
          payment_status: query.payment_status,
        })
      },

      mapRow: (order) => ({
        id: order.id,
        orderId: order.orderId,
        status: order.status,
        shipping_charges: order.shipping_charges,
        is_igst_applicable: order.is_igst_applicable,
        total_price: order.total_price,
        discounted_price: order.discounted_price,
        cancellation_reason: order.cancellation_reason,
        payment_method: order.payment_method,
        is_paid: order.is_paid,
        paid_at: order.paid_at,
        is_delivered: order.is_delivered,
        delivered_at: order.delivered_at,
        user_id: order.user_id,
        name: order.user ? order.user.name : "",
        email: order.user ? order.user.email : "",
        razorpay_status: order.razorpay_payment ? order.razorpay_payment.status : "",
        razorpay_order_id: order.razorpay_payment ? order.razorpay_payment.razorpay_order_id : "",
        razorpay_payment_id: order.razorpay_payment ? order.razorpay_payment.razorpay_payment_id : "",
        products: order.order_items.map(item => item.product_title).join(", "),
        createdAt: order.createdAt?.toISOString(),
        updatedAt: order.updatedAt?.toISOString(),
      }),
    })
  }
}
