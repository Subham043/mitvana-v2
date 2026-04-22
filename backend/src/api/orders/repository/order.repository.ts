import { Injectable } from '@nestjs/common';
import { OrderRepositoryInterface } from '../interface/order.repository.interface';
import {
  OrderInfoEntity,
  OrderInfoSelect,
  OrderListEntity,
  OrderPaginatedSelect,
  OrderPublicListEntity,
  OrderPublicPaginatedSelect,
} from '../entity/order.entity';
import { DatabaseService } from 'src/database/database.service';
import {
  order,
} from 'src/database/schema';
import {
  and,
  countDistinct,
  desc,
  eq,
  like,
  not,
  or,
  SQL,
  sql,
} from 'drizzle-orm';
import { CountQuery, PaginationQuery } from 'src/utils/pagination/normalize.pagination';
import { CustomQueryCacheConfig } from 'src/utils/types';
import { ConfigService } from '@nestjs/config';
import { OrderFilterDto } from '../schema/order-filter.schema';
import { OrderUpdateStatusDto } from '../schema/order-update-status.schema';
import { OrderCancelDto } from '../schema/order-cancel.schema';

@Injectable()
export class OrderRepository implements OrderRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService,
    private readonly configService: ConfigService,
  ) { }

  private getOrderPaginatedQuery() {
    return this.databaseClient.db
      .select(
        OrderPaginatedSelect(
          `${this.configService.get<string>('APP_URL')}/uploads/`,
        ),
      )
      .from(order)
      .orderBy(desc(order.createdAt));
  }

  private getPublicOrderPaginatedQuery() {
    return this.databaseClient.db
      .select(
        OrderPublicPaginatedSelect(),
      )
      .from(order)
      .orderBy(desc(order.createdAt));
  }

  private getOrderPaginatedCountQuery() {
    return this.databaseClient.db
      .select({ count: countDistinct(order.id) })
      .from(order);
  }

  private getOrderInfoQuery() {
    return this.databaseClient.db
      .select(
        OrderInfoSelect(
          `${this.configService.get<string>('APP_URL')}/uploads/`,
        ),
      )
      .from(order)
      .limit(1);
  }

  async getById(id: string, cacheConfig: CustomQueryCacheConfig = false): Promise<OrderInfoEntity | null> {
    const result = await this.getOrderInfoQuery().where(eq(order.id, id))
      .$withCache(cacheConfig) as unknown as OrderInfoEntity[];
    if (!result.length) return null;
    return result[0];
  }

  async getByIdAndUserId(id: string, userId: string, cacheConfig: CustomQueryCacheConfig = false): Promise<OrderInfoEntity | null> {
    const result = await this.getOrderInfoQuery().where(and(eq(order.id, id), eq(order.user_id, userId)))
      .$withCache(cacheConfig) as unknown as OrderInfoEntity[];
    if (!result.length) return null;
    return result[0];
  }

  private async filters(search: string = "", status?: string, payment_status?: string): Promise<SQL<unknown> | undefined> {
    const searchFilters: SQL[] = [];
    const filters: SQL[] = [];
    if (search.length > 0) {
      searchFilters.push(like(order.id, `%${search}%`));
      searchFilters.push(like(order.orderId, `%${search}%`));
      searchFilters.push(like(order.total_price, `%${search}%`));
      searchFilters.push(like(order.total_discounted_price, `%${search}%`));
      searchFilters.push(like(order.cancellation_reason, `%${search}%`));
      searchFilters.push(sql`
        EXISTS (
          SELECT 1
          FROM users u
          WHERE u.id = ${order.user_id}
            AND (
              u.name LIKE ${`%${search}%`}
              OR u.email LIKE ${`%${search}%`}
              OR u.phone LIKE ${`%${search}%`}
            )
        )
      `);
      searchFilters.push(sql`
        EXISTS (
          SELECT 1
          FROM order_razorpay_payment r
          WHERE r.order_id = ${order.id}
            AND (
              r.razorpay_order_id LIKE ${`%${search}%`}
              OR r.razorpay_payment_id LIKE ${`%${search}%`}
              OR r.status LIKE ${`%${search}%`}
            )
        )
      `);
      searchFilters.push(sql`
        EXISTS (
          SELECT 1
          FROM order_product op
          WHERE op.order_id = ${order.id}
            AND (
              op.product_title LIKE ${`%${search}%`}
              OR op.product_slug LIKE ${`%${search}%`}
              OR op.product_sku LIKE ${`%${search}%`}
              OR op.product_hsn LIKE ${`%${search}%`}
              OR op.product_price LIKE ${`%${search}%`}
              OR op.product_discounted_price LIKE ${`%${search}%`}
              OR op.quantity LIKE ${`%${search}%`}
            )
        )
      `);
    }
    if (status !== undefined) {
      filters.push(eq(order.status, status));
    }
    if (payment_status !== undefined) {
      filters.push(sql`
        EXISTS (
          SELECT 1
          FROM order_razorpay_payment r
          WHERE r.order_id = ${order.id}
            AND r.status = ${payment_status}
        )
      `);
    }
    //or for searchFilters and and for filters
    const searchCondition = searchFilters.length > 0 ? or(...searchFilters) : undefined;
    const filterCondition = filters.length > 0 ? and(...filters) : undefined;
    return searchCondition && filterCondition ? and(searchCondition, filterCondition) : searchCondition || filterCondition;
  }

  async getAll(
    query: PaginationQuery<OrderFilterDto>,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<OrderListEntity[]> {
    const { limit, offset, search, status, payment_status } = query;
    const filters = await this.filters(search, status, payment_status);
    const result = await this.getOrderPaginatedQuery()
      .where(filters)
      .limit(limit)
      .offset(offset)
      .$withCache(cacheConfig);
    return result;
  }

  async getAllByUserId(userId: string, query: PaginationQuery<OrderFilterDto>, cacheConfig: CustomQueryCacheConfig = false): Promise<OrderPublicListEntity[]> {
    const { limit, offset, search, status, payment_status } = query;
    const filters = await this.filters(search, status, payment_status);
    const result = await this.getPublicOrderPaginatedQuery()
      .where(and(eq(order.user_id, userId), filters))
      .limit(limit)
      .offset(offset)
      .$withCache(cacheConfig);
    return result;
  }

  async count(
    query: CountQuery<OrderFilterDto>,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<number> {
    const { search, status, payment_status } = query;
    const filters = await this.filters(search, status, payment_status);
    const result = await this.getOrderPaginatedCountQuery()
      .where(filters)
      .$withCache(cacheConfig);
    return result[0].count;
  }

  async countByUserId(userId: string, query: CountQuery<OrderFilterDto>, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const { search, status, payment_status } = query;
    const filters = await this.filters(search, status, payment_status);
    const result = await this.getOrderPaginatedCountQuery()
      .where(and(eq(order.user_id, userId), filters))
      .$withCache(cacheConfig);
    return result[0].count;
  }

  async cancelOrder(id: string, userId: string, dto: OrderCancelDto): Promise<OrderInfoEntity | null> {
    await this.databaseClient.db
      .update(order)
      .set({
        status: "Cancelled By user",
        cancellation_reason: dto.cancellation_reason,
      })
      .where(and(eq(order.id, id), eq(order.user_id, userId)));
    return await this.getById(id);
  }

  async updateOrderStatus(
    id: string,
    data: OrderUpdateStatusDto,
  ): Promise<OrderInfoEntity | null> {
    await this.databaseClient.db
      .update(order)
      .set({
        status: data.status,
        cancellation_reason: data.cancellation_reason ? data.cancellation_reason : null,
      })
      .where(eq(order.id, id));
    return await this.getById(id);
  }
}
