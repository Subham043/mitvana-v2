import { Injectable } from '@nestjs/common';
import { ProductReviewRepositoryInterface } from '../interface/product_review.repository.interface';
import {
  NewProductReviewEntity,
  ProductReviewQueryEntityType,
  ProductReviewSelect,
  UpdateProductReviewEntity,
} from '../entity/product_review.entity';
import { DatabaseService } from 'src/database/database.service';
import { product_review } from 'src/database/schema/product_review.schema';
import { desc, count, eq, like, and, or, sql, SQL } from 'drizzle-orm';
import { CountQuery, PaginationQuery } from 'src/utils/pagination/normalize.pagination';
import { CustomQueryCacheConfig } from 'src/utils/types';
import { ConfigService } from '@nestjs/config';
import { product, users } from 'src/database/schema';
import { ProductReviewFilterDto } from '../schema/product-review-filter.schema';

@Injectable()
export class IProductReviewRepository implements ProductReviewRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService,
    private readonly configService: ConfigService,
  ) { }

  private getProductReviewQuery() {
    return this.databaseClient.db
      .select(ProductReviewSelect(
        `${this.configService.get<string>('APP_URL')}/uploads/`,
      ))
      .from(product_review)
      .leftJoin(product, eq(product_review.product_id, product.id))
      .leftJoin(users, eq(product_review.user_id, users.id))
      .orderBy(desc(product_review.createdAt))
  }

  private getProductReviewCountQuery() {
    return this.databaseClient.db
      .select({ count: count(product_review.id) })
      .from(product_review)
      .leftJoin(product, eq(product_review.product_id, product.id))
      .leftJoin(users, eq(product_review.user_id, users.id))
  }

  async getByIdAndUserId(
    id: string,
    userId: string,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<ProductReviewQueryEntityType | null> {
    const result = await this.getProductReviewQuery()
      .where(and(eq(product_review.id, id), eq(product_review.user_id, userId)))
      .limit(1)
      .$withCache(cacheConfig);
    if (!result.length) return null;
    const review = result[0];
    return review;
  }

  async getById(
    id: string,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<ProductReviewQueryEntityType | null> {
    const result = await this.getProductReviewQuery()
      .where(eq(product_review.id, id))
      .limit(1)
      .$withCache(cacheConfig);
    if (!result.length) return null;
    const review = result[0];
    return review;
  }

  private async filters(search: string = "", status?: string): Promise<SQL<unknown> | undefined> {
    const searchFilters: SQL[] = [];
    const filters: SQL[] = [];
    if (search.length > 0) {
      searchFilters.push(like(product_review.title, `%${search}%`));
      searchFilters.push(like(product_review.comment, `%${search}%`));
      searchFilters.push(like(product_review.rating, `%${search}%`));
      searchFilters.push(like(product.title, `%${search}%`));
      searchFilters.push(like(product.name, `%${search}%`));
      searchFilters.push(like(product.slug, `%${search}%`));
      searchFilters.push(like(product.sub_title, `%${search}%`));
      searchFilters.push(like(users.name, `%${search}%`));
      searchFilters.push(like(users.email, `%${search}%`));
    }
    if (status !== undefined) {
      filters.push(eq(product_review.status, status));
    }
    //or for searchFilters and and for filters
    const searchCondition = searchFilters.length > 0 ? or(...searchFilters) : undefined;
    const filterCondition = filters.length > 0 ? and(...filters) : undefined;
    return searchCondition && filterCondition ? and(searchCondition, filterCondition) : searchCondition || filterCondition;
  }

  async getAll(
    query: PaginationQuery<ProductReviewFilterDto>,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<ProductReviewQueryEntityType[]> {
    const { limit, offset, search, status } = query;
    const filters = await this.filters(search, status);
    const result = await this.getProductReviewQuery()
      .where(filters)
      .limit(limit)
      .offset(offset)
      .$withCache(cacheConfig);
    return result;
  }

  async count(
    query: CountQuery<ProductReviewFilterDto>,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<number> {
    const { search, status } = query;
    const filters = await this.filters(search, status);
    const result = await this.getProductReviewCountQuery()
      .where(filters)
      .$withCache(cacheConfig);
    return result[0].count;
  }

  async getAllProductReviewsByUserId(
    query: PaginationQuery<ProductReviewFilterDto>,
    userId: string,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<ProductReviewQueryEntityType[]> {
    const { limit, offset, search, status } = query;
    const filters = await this.filters(search, status);
    const result = await this.getProductReviewQuery()
      .where(
        and(
          eq(product_review.user_id, userId),
          filters
        )
      )
      .limit(limit)
      .offset(offset)
      .$withCache(cacheConfig);
    return result;
  }

  async countProductReviewsByUserId(
    userId: string,
    query: CountQuery<ProductReviewFilterDto>,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<number> {
    const { search, status } = query;
    const filters = await this.filters(search, status);
    const result = await this.getProductReviewCountQuery()
      .where(
        and(
          eq(product_review.user_id, userId),
          filters
        ),
      )
      .$withCache(cacheConfig);
    return result[0].count;
  }

  async getAllApprovedProductReviewsByProductId(
    query: PaginationQuery<ProductReviewFilterDto>,
    productId: string,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<ProductReviewQueryEntityType[]> {
    const { limit, offset, search, status } = query;
    const filters = await this.filters(search, status);
    const result = await this.getProductReviewQuery()
      .where(
        and(
          eq(product_review.product_id, productId),
          eq(product_review.status, 'approved'),
          filters
        )
      )
      .limit(limit)
      .offset(offset)
      .$withCache(cacheConfig);
    return result;
  }

  async countApprovedProductReviewsByProductId(
    productId: string,
    query: CountQuery<ProductReviewFilterDto>,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<number> {
    const { search, status } = query;
    const filters = await this.filters(search, status);
    const result = await this.getProductReviewCountQuery()
      .where(
        and(
          eq(product_review.product_id, productId),
          eq(product_review.status, 'approved'),
          filters
        ),
      )
      .$withCache(cacheConfig);
    return result[0].count;
  }

  async createProductReview(
    data: NewProductReviewEntity,
  ): Promise<ProductReviewQueryEntityType | null> {
    const result = await this.databaseClient.db
      .insert(product_review)
      .values(data)
      .$returningId();
    return await this.getById(result[0].id);
  }

  async updateProductReview(
    id: string,
    data: UpdateProductReviewEntity,
  ): Promise<ProductReviewQueryEntityType | null> {
    await this.databaseClient.db
      .update(product_review)
      .set(data)
      .where(eq(product_review.id, id));
    return await this.getById(id);
  }

  async deleteProductReview(id: string, userId: string): Promise<void> {
    await this.databaseClient.db
      .delete(product_review)
      .where(
        and(eq(product_review.id, id), eq(product_review.user_id, userId)),
      );
  }

  async getProductReviewRatingStats(
    productId: string,
    cacheConfig: CustomQueryCacheConfig = false,
  ): Promise<{
    oneRating: number;
    twoRating: number;
    threeRating: number;
    fourRating: number;
    fiveRating: number;
    total: number;
    percentages: {
      one: number;
      two: number;
      three: number;
      four: number;
      five: number;
    };
  }> {
    const result = await this.databaseClient.db
      .select({
        oneRating: sql<number>`count(case when ${product_review.rating} = 1 then 1 end)`,
        twoRating: sql<number>`count(case when ${product_review.rating} = 2 then 1 end)`,
        threeRating: sql<number>`count(case when ${product_review.rating} = 3 then 1 end)`,
        fourRating: sql<number>`count(case when ${product_review.rating} = 4 then 1 end)`,
        fiveRating: sql<number>`count(case when ${product_review.rating} = 5 then 1 end)`,
        total: sql<number>`count(*)`,
      })
      .from(product_review)
      .where(
        and(
          eq(product_review.product_id, productId),
          eq(product_review.status, 'approved'),
        ),
      )
      .$withCache(cacheConfig);

    const row = result[0];

    const one = Number(row?.oneRating ?? 0);
    const two = Number(row?.twoRating ?? 0);
    const three = Number(row?.threeRating ?? 0);
    const four = Number(row?.fourRating ?? 0);
    const five = Number(row?.fiveRating ?? 0);
    const total = Number(row?.total ?? 0);

    const safePercent = (value: number) =>
      total === 0 ? 0 : Number(((value / total) * 100).toFixed(1));

    return {
      oneRating: one,
      twoRating: two,
      threeRating: three,
      fourRating: four,
      fiveRating: five,
      total,
      percentages: {
        one: safePercent(one),
        two: safePercent(two),
        three: safePercent(three),
        four: safePercent(four),
        five: safePercent(five),
      },
    };
  }
}
