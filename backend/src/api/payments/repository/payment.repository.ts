import { Injectable } from '@nestjs/common';
import { PaymentRepositoryInterface } from '../interface/payment.repository.interface';
import {
  PaymentListEntity,
  PaymentListSelect,
} from '../entity/payment.entity';
import { DatabaseService } from 'src/database/database.service';
import {
  order,
  order_razorpay_payment,
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
import { PaymentFilterDto } from '../schema/payment-filter.schema';

@Injectable()
export class PaymentRepository implements PaymentRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService,
  ) { }

  private getPaymentPaginatedQuery() {
    return this.databaseClient.db
      .select(
        PaymentListSelect(),
      )
      .from(order_razorpay_payment)
      .orderBy(desc(order_razorpay_payment.createdAt));
  }

  private getPaymentPaginatedCountQuery() {
    return this.databaseClient.db
      .select({ count: countDistinct(order_razorpay_payment.order_id) })
      .from(order_razorpay_payment);
  }

  private async filters(search: string = "", status?: string): Promise<SQL<unknown> | undefined> {
    const searchFilters: SQL[] = [];
    const filters: SQL[] = [];
    if (search.length > 0) {
      searchFilters.push(like(order_razorpay_payment.order_id, `%${search}%`));
      searchFilters.push(like(order_razorpay_payment.razorpay_order_id, `%${search}%`));
      searchFilters.push(like(order_razorpay_payment.razorpay_order_id, `%${search}%`));
      searchFilters.push(like(order_razorpay_payment.status, `%${search}%`));
      searchFilters.push(sql`
        EXISTS (
          SELECT 1
          FROM order o
          LEFT JOIN users u ON u.id = o.user_id
          WHERE o.id = ${order_razorpay_payment.order_id}
            AND (
              o.orderId LIKE ${`%${search}%`}
              OR CAST(o.total_price AS CHAR) LIKE ${`%${search}%`}
              OR u.name LIKE ${`%${search}%`}
              OR u.email LIKE ${`%${search}%`}
            )
        )
      `);
    }

    if (status !== undefined) {
      filters.push(eq(order_razorpay_payment.status, status));
    }

    //or for searchFilters and and for filters
    const searchCondition = searchFilters.length > 0 ? or(...searchFilters) : undefined;
    const filterCondition = filters.length > 0 ? and(...filters) : undefined;
    return searchCondition && filterCondition ? and(searchCondition, filterCondition) : searchCondition || filterCondition;
  }

  async getAll(
    query: PaginationQuery<PaymentFilterDto>,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<PaymentListEntity[]> {
    const { limit, offset, search, status } = query;
    const filters = await this.filters(search, status);
    const result = await this.getPaymentPaginatedQuery()
      .where(filters)
      .limit(limit)
      .offset(offset)
      .$withCache(cacheConfig);
    return result as PaymentListEntity[];
  }

  async count(
    query: CountQuery<PaymentFilterDto>,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<number> {
    const { search, status } = query;
    const filters = await this.filters(search, status);
    const result = await this.getPaymentPaginatedCountQuery()
      .where(filters)
      .$withCache(cacheConfig);
    return result[0].count;
  }
}
