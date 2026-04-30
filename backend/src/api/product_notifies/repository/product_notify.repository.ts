import { Injectable } from '@nestjs/common';
import { ProductNotifyRepositoryInterface } from '../interface/product_notify.repository.interface';
import {
  NewProductNotifyEntity,
  ProductNotifyQueryEntityType,
  ProductNotifySelect,
} from '../entity/product_notify.entity';
import { DatabaseService } from 'src/database/database.service';
import { product_notify } from 'src/database/schema/product_notify.schema';
import { desc, count, eq, like, and, or, sql, SQL } from 'drizzle-orm';
import { CountQuery, PaginationQuery } from 'src/utils/pagination/normalize.pagination';
import { CustomQueryCacheConfig } from 'src/utils/types';
import { ConfigService } from '@nestjs/config';
import { product, users } from 'src/database/schema';
import { AppConfigType } from 'src/config/schema';

@Injectable()
export class IProductNotifyRepository implements ProductNotifyRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService,
    private readonly configService: ConfigService<AppConfigType>,
  ) { }

  private getProductNotifyQuery() {
    return this.databaseClient.db
      .select(ProductNotifySelect(
        `${this.configService.get('APP_URL')}/uploads/`,
      ))
      .from(product_notify)
      .leftJoin(product, eq(product_notify.product_id, product.id))
      .orderBy(desc(product_notify.createdAt))
  }

  private getProductNotifyCountQuery() {
    return this.databaseClient.db
      .select({ count: count(product_notify.id) })
      .from(product_notify)
      .leftJoin(product, eq(product_notify.product_id, product.id))
  }

  async getById(
    id: string,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<ProductNotifyQueryEntityType | null> {
    const result = await this.getProductNotifyQuery()
      .where(eq(product_notify.id, id))
      .limit(1)
      .$withCache(cacheConfig);
    if (!result.length) return null;
    const notify = result[0];
    return notify;
  }

  async getByProductIdAndEmail(
    productId: string,
    email: string,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<ProductNotifyQueryEntityType | null> {
    const result = await this.getProductNotifyQuery()
      .where(and(eq(product_notify.product_id, productId), eq(product_notify.email, email)))
      .limit(1)
      .$withCache(cacheConfig);
    if (!result.length) return null;
    const notify = result[0];
    return notify;
  }

  private async filters(search: string = ""): Promise<SQL<unknown> | undefined> {
    const searchFilters: SQL[] = [];
    if (search.length > 0) {
      searchFilters.push(like(product_notify.email, `%${search}%`));
      searchFilters.push(like(product.title, `%${search}%`));
      searchFilters.push(like(product.name, `%${search}%`));
      searchFilters.push(like(product.slug, `%${search}%`));
      searchFilters.push(like(product.sub_title, `%${search}%`));
      searchFilters.push(like(users.name, `%${search}%`));
      searchFilters.push(like(users.email, `%${search}%`));
    }
    //or for searchFilters and and for filters
    return searchFilters.length > 0 ? or(...searchFilters) : undefined;
  }

  async getAll(
    query: PaginationQuery,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<ProductNotifyQueryEntityType[]> {
    const { limit, offset, search } = query;
    const filters = await this.filters(search);
    const result = await this.getProductNotifyQuery()
      .where(filters)
      .limit(limit)
      .offset(offset)
      .$withCache(cacheConfig);
    return result;
  }

  async count(
    search?: string,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<number> {
    const filters = await this.filters(search);
    const result = await this.getProductNotifyCountQuery()
      .where(filters)
      .$withCache(cacheConfig);
    return result[0].count;
  }

  async createProductNotify(
    data: NewProductNotifyEntity,
  ): Promise<ProductNotifyQueryEntityType | null> {
    const result = await this.databaseClient.db
      .insert(product_notify)
      .values(data)
      .$returningId();
    return await this.getById(result[0].id);
  }

  async deleteProductNotify(id: string): Promise<void> {
    await this.databaseClient.db
      .delete(product_notify)
      .where(eq(product_notify.id, id));
  }
}
