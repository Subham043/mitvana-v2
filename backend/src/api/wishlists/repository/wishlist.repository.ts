import { Injectable } from '@nestjs/common';
import { WishlistRepositoryInterface } from '../interface/wishlist.repository.interface';
import { NewWishlistEntity, WishlistQueryEntityType, WishlistQuerySelect } from '../entity/wishlist.entity';
import { DatabaseService } from 'src/database/database.service';
import { product_review } from 'src/database/schema/product_review.schema';
import { desc, count, eq, like, and, or } from 'drizzle-orm';
import { PaginationQuery } from 'src/utils/pagination/normalize.pagination';
import { CustomQueryCacheConfig } from 'src/utils/types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IWishlistRepository implements WishlistRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService,
    private readonly configService: ConfigService
  ) { }
  private getWishlistQueryWithImageSelect() {
    return WishlistQuerySelect(`${this.configService.get<string>('APP_URL')}/uploads/`)
  }
  private mapWishlistQuery(review: any): WishlistQueryEntityType {
    return {
      ...review,
    };
  }
  async getByProductIdAndUserId(productId: string, userId: string, cacheConfig: CustomQueryCacheConfig = false): Promise<WishlistQueryEntityType | null> {
    const result = await this.databaseClient.db.query.product_review.findFirst({
      where: and(eq(product_review.product_id, productId), eq(product_review.user_id, userId)),
      ...this.getWishlistQueryWithImageSelect(),
    });
    if (!result) return null;
    return this.mapWishlistQuery(result);
  }
  async getAllByUserId(query: PaginationQuery, userId: string, cacheConfig: CustomQueryCacheConfig = false): Promise<WishlistQueryEntityType[]> {
    const { limit, offset } = query;
    const result = await this.databaseClient.db.query.product_review.findMany({
      where: and(eq(product_review.user_id, userId)),
      limit,
      offset,
      orderBy: desc(product_review.createdAt),
      ...this.getWishlistQueryWithImageSelect(),
    });
    return result.map(this.mapWishlistQuery);
  }

  async countByUserId(userId: string, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const result = await this.databaseClient.db.select({ count: count(product_review.id) }).from(product_review).where(and(eq(product_review.user_id, userId))).$withCache(cacheConfig);
    return result[0].count;
  }

  async createWishlist(data: NewWishlistEntity): Promise<WishlistQueryEntityType | null> {
    await this.databaseClient.db.insert(product_review).values(data);
    return await this.getByProductIdAndUserId(data.product_id, data.user_id);
  }

  async deleteWishlist(productId: string, userId: string): Promise<void> {
    await this.databaseClient.db.delete(product_review).where(and(eq(product_review.product_id, productId), eq(product_review.user_id, userId)));
  }
}
