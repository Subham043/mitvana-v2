import { Injectable } from '@nestjs/common';
import { CouponCodeRepositoryInterface } from '../interface/coupon_code.repository.interface';
import { NewCouponCodeEntity, CouponCodeEntity, UpdateCouponCodeEntity } from '../entity/coupon_code.entity';
import { DatabaseService } from 'src/database/database.service';
import { coupon_code } from 'src/database/schema';
import { desc, count, eq, like, SQL, or, and } from 'drizzle-orm';
import { PaginationQuery } from 'src/utils/pagination/normalize.pagination';
import { CustomQueryCacheConfig } from 'src/utils/types';
import { CouponCodeFilterDto } from '../schema/coupon-code-filter.schema';

@Injectable()
export class ICouponCodeRepository implements CouponCodeRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService
  ) { }
  async getByCode(code: string, cacheConfig: CustomQueryCacheConfig = false): Promise<CouponCodeEntity | null> {
    const result = await this.databaseClient.db.select().from(coupon_code).where(eq(coupon_code.code, code)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    return result[0];
  }
  async getById(id: string, cacheConfig: CustomQueryCacheConfig = false): Promise<CouponCodeEntity | null> {
    const result = await this.databaseClient.db.select().from(coupon_code).where(eq(coupon_code.id, id)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    return result[0];
  }

  private async filters(search: string = "", is_draft?: boolean): Promise<SQL<unknown> | undefined> {
    const searchFilters: SQL[] = [];
    const filters: SQL[] = [];
    if (search.length > 0) {
      searchFilters.push(like(coupon_code.code, `%${search}%`));
      searchFilters.push(like(coupon_code.discount_percentage, `%${search}%`));
    }
    if (is_draft !== undefined) {
      filters.push(eq(coupon_code.is_draft, is_draft));
    }
    //or for searchFilters and and for filters
    const searchCondition = searchFilters.length > 0 ? or(...searchFilters) : undefined;
    const filterCondition = filters.length > 0 ? and(...filters) : undefined;
    return searchCondition && filterCondition ? and(searchCondition, filterCondition) : searchCondition || filterCondition;
  }

  async getAll(query: PaginationQuery<CouponCodeFilterDto>, cacheConfig: CustomQueryCacheConfig = false): Promise<CouponCodeEntity[]> {
    const { limit, offset, search, is_draft } = query;
    const filters = await this.filters(search, is_draft);
    const result = await this.databaseClient.db.select().from(coupon_code).where(filters).orderBy(desc(coupon_code.createdAt)).limit(limit).offset(offset).$withCache(cacheConfig);
    return result;
  }

  async count(query: Omit<PaginationQuery<CouponCodeFilterDto>, 'offset' | 'limit' | 'page'>, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const { search, is_draft } = query;
    const filters = await this.filters(search, is_draft);
    const result = await this.databaseClient.db.select({ count: count(coupon_code.id) }).from(coupon_code).where(filters).$withCache(cacheConfig);
    return result[0].count;
  }
  async createCouponCode(data: NewCouponCodeEntity): Promise<CouponCodeEntity | null> {
    const result = await this.databaseClient.db.insert(coupon_code).values(data).$returningId();
    return await this.getById(result[0].id);
  }
  async updateCouponCode(id: string, data: UpdateCouponCodeEntity): Promise<CouponCodeEntity | null> {
    await this.databaseClient.db.update(coupon_code).set(data).where(eq(coupon_code.id, id));
    return await this.getById(id);
  }
  async deleteCouponCode(id: string): Promise<void> {
    await this.databaseClient.db.delete(coupon_code).where(eq(coupon_code.id, id));
  }
}
