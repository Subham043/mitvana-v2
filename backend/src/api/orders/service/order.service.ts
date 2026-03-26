import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { OrderServiceInterface } from '../interface/order.service.interface';
import { OrderRepositoryInterface } from '../interface/order.repository.interface';
import { ORDER_REPOSITORY } from '../order.constant';
import { OrderInfoEntity, OrderListEntity } from '../entity/order.entity';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { OrderFilterDto } from '../schema/order-filter.schema';

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
}
