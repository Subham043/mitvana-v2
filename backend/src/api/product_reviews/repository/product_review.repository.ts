import { Injectable } from '@nestjs/common';
import { ProductReviewRepositoryInterface } from '../interface/product_review.repository.interface';
import { NewProductReviewEntity, ProductReviewQueryEntityType, ProductReviewQuerySelect, UpdateProductReviewEntity } from '../entity/product_review.entity';
import { DatabaseService } from 'src/database/database.service';
import { product_review } from 'src/database/schema/product_review.schema';
import { desc, count, eq, like, and, or } from 'drizzle-orm';
import { PaginationQuery } from 'src/utils/pagination/normalize.pagination';
import { CustomQueryCacheConfig } from 'src/utils/types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IProductReviewRepository implements ProductReviewRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService,
    private readonly configService: ConfigService
  ) { }
  private getProductReviewQueryWithImageSelect() {
    return ProductReviewQuerySelect(`${this.configService.get<string>('APP_URL')}/uploads/`)
  }
  private mapProductReviewQuery(review: any): ProductReviewQueryEntityType {
    return {
      ...review,
    };
  }
  async getByIdAndUserId(id: string, userId: string, cacheConfig: CustomQueryCacheConfig = false): Promise<ProductReviewQueryEntityType | null> {
    const result = await this.databaseClient.db.query.product_review.findFirst({
      where: and(eq(product_review.id, id), eq(product_review.user_id, userId)),
      ...this.getProductReviewQueryWithImageSelect(),
    });
    if (!result) return null;
    return this.mapProductReviewQuery(result);
  }
  async getById(id: string, cacheConfig: CustomQueryCacheConfig = false): Promise<ProductReviewQueryEntityType | null> {
    const result = await this.databaseClient.db.query.product_review.findFirst({
      where: eq(product_review.id, id),
      ...this.getProductReviewQueryWithImageSelect(),
    });
    if (!result) return null;
    return this.mapProductReviewQuery(result);
  }
  async getAll(query: PaginationQuery, cacheConfig: CustomQueryCacheConfig = false): Promise<ProductReviewQueryEntityType[]> {
    const { limit, offset, search } = query;
    const result = await this.databaseClient.db.query.product_review.findMany({
      where: search ? or(like(product_review.title, `%${search}%`), like(product_review.comment, `%${search}%`)) : undefined,
      limit,
      offset,
      orderBy: desc(product_review.createdAt),
      ...this.getProductReviewQueryWithImageSelect(),
    });
    return result.map(this.mapProductReviewQuery);
  }
  async getAllByUserId(query: PaginationQuery, userId: string, cacheConfig: CustomQueryCacheConfig = false): Promise<ProductReviewQueryEntityType[]> {
    const { limit, offset, search } = query;
    const result = await this.databaseClient.db.query.product_review.findMany({
      where: and(eq(product_review.user_id, userId), search ? or(like(product_review.title, `%${search}%`), like(product_review.comment, `%${search}%`)) : undefined),
      limit,
      offset,
      orderBy: desc(product_review.createdAt),
      ...this.getProductReviewQueryWithImageSelect(),
    });
    return result.map(this.mapProductReviewQuery);
  }

  async getAllApproved(query: PaginationQuery, cacheConfig: CustomQueryCacheConfig = false): Promise<ProductReviewQueryEntityType[]> {
    const { limit, offset, search } = query;
    const result = await this.databaseClient.db.query.product_review.findMany({
      where: and(eq(product_review.status, 'approved'), search ? or(like(product_review.title, `%${search}%`), like(product_review.comment, `%${search}%`)) : undefined),
      limit,
      offset,
      orderBy: desc(product_review.createdAt),
      ...this.getProductReviewQueryWithImageSelect(),
    });
    return result.map(this.mapProductReviewQuery);
  }

  async count(search?: string, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const result = await this.databaseClient.db.select({ count: count(product_review.id) }).from(product_review).where(search ? or(like(product_review.title, `%${search}%`), like(product_review.comment, `%${search}%`)) : undefined).$withCache(cacheConfig);
    return result[0].count;
  }

  async countByUserId(userId: string, search?: string, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const result = await this.databaseClient.db.select({ count: count(product_review.id) }).from(product_review).where(and(eq(product_review.user_id, userId), search ? or(like(product_review.title, `%${search}%`), like(product_review.comment, `%${search}%`)) : undefined)).$withCache(cacheConfig);
    return result[0].count;
  }

  async countApproved(search?: string, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const result = await this.databaseClient.db.select({ count: count(product_review.id) }).from(product_review).where(and(eq(product_review.status, 'approved'), search ? or(like(product_review.title, `%${search}%`), like(product_review.comment, `%${search}%`)) : undefined)).$withCache(cacheConfig);
    return result[0].count;
  }

  async createProductReview(data: NewProductReviewEntity): Promise<ProductReviewQueryEntityType | null> {
    const result = await this.databaseClient.db.insert(product_review).values(data).$returningId();
    return await this.getById(result[0].id);
  }

  async updateProductReview(id: string, data: UpdateProductReviewEntity): Promise<ProductReviewQueryEntityType | null> {
    await this.databaseClient.db.update(product_review).set(data).where(eq(product_review.id, id));
    return await this.getById(id);
  }

  async deleteProductReview(id: string, userId: string): Promise<void> {
    await this.databaseClient.db.delete(product_review).where(and(eq(product_review.id, id), eq(product_review.user_id, userId)));
  }
}
