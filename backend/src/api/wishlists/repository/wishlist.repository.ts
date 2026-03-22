import { Injectable } from '@nestjs/common';
import { WishlistRepositoryInterface } from '../interface/wishlist.repository.interface';
import { NewWishlistEntity, WishlistQueryEntityType, WishlistSelect } from '../entity/wishlist.entity';
import { DatabaseService } from 'src/database/database.service';
import { desc, eq, and, countDistinct } from 'drizzle-orm';
import { PaginationQuery } from 'src/utils/pagination/normalize.pagination';
import { CustomQueryCacheConfig } from 'src/utils/types';
import { ConfigService } from '@nestjs/config';
import { product, users, wishlist } from 'src/database/schema';

@Injectable()
export class IWishlistRepository implements WishlistRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService,
    private readonly configService: ConfigService
  ) { }
  private getWishlistQuery() {
    return this.databaseClient.db
      .select(WishlistSelect(
        `${this.configService.get<string>('APP_URL')}/uploads/`,
      ))
      .from(wishlist)
      .leftJoin(product, eq(wishlist.product_id, product.id))
      .leftJoin(users, eq(wishlist.user_id, users.id))
      .orderBy(desc(wishlist.createdAt))
  }

  private getWishlistCountQuery() {
    return this.databaseClient.db
      .select({ count: countDistinct(wishlist.product_id) })
      .from(wishlist)
      .leftJoin(product, eq(wishlist.product_id, product.id))
      .leftJoin(users, eq(wishlist.user_id, users.id))
  }

  async getByProductIdAndUserId(productId: string, userId: string, cacheConfig: CustomQueryCacheConfig = false): Promise<WishlistQueryEntityType | null> {
    const result = await this.getWishlistQuery()
      .where(and(eq(wishlist.product_id, productId), eq(wishlist.user_id, userId)))
      .limit(1)
      .$withCache(cacheConfig);
    if (!result.length) return null;
    return result[0];
  }

  async getAllByUserId(query: PaginationQuery, userId: string, cacheConfig: CustomQueryCacheConfig = false): Promise<WishlistQueryEntityType[]> {
    const { limit, offset } = query;
    const result = await this.getWishlistQuery()
      .where(eq(wishlist.user_id, userId))
      .limit(limit)
      .offset(offset)
      .$withCache(cacheConfig);
    return result;
  }

  async countByUserId(userId: string, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const result = await this.getWishlistCountQuery()
      .where(eq(wishlist.user_id, userId))
      .$withCache(cacheConfig);
    return result[0].count;
  }

  async createWishlist(data: NewWishlistEntity): Promise<WishlistQueryEntityType | null> {
    const result = await this.getByProductIdAndUserId(data.product_id, data.user_id);
    if (result) return result;
    await this.databaseClient.db.insert(wishlist).values(data);
    return await this.getByProductIdAndUserId(data.product_id, data.user_id);
  }

  async deleteWishlist(productId: string, userId: string): Promise<void> {
    await this.databaseClient.db.delete(wishlist).where(and(eq(wishlist.product_id, productId), eq(wishlist.user_id, userId)));
  }

  async clearWishlist(userId: string): Promise<void> {
    await this.databaseClient.db.delete(wishlist).where(eq(wishlist.user_id, userId));
  }
}
