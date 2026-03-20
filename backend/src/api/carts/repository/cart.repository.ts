import { Injectable } from '@nestjs/common';
import { CartRepositoryInterface } from '../interface/cart.repository.interface';
import { CartQueryEntityType, CartQuerySelect } from '../entity/cart.entity';
import { DatabaseService } from 'src/database/database.service';
import { cart } from 'src/database/schema/cart.schema';
import { and, count, eq } from 'drizzle-orm';
import { CustomQueryCacheConfig } from 'src/utils/types';
import { ConfigService } from '@nestjs/config';
import { CartDto } from '../schema/cart.schema';
import { cart_product } from 'src/database/schema';

@Injectable()
export class ICartRepository implements CartRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService,
    private readonly configService: ConfigService
  ) { }
  private getCartQueryWithImageSelect() {
    return CartQuerySelect(`${this.configService.get<string>('APP_URL')}/uploads/`)
  }
  private mapCartQuery(review: any): CartQueryEntityType {
    return {
      ...review,
    };
  }
  async getByUserId(userId: string, cacheConfig: CustomQueryCacheConfig = false): Promise<CartQueryEntityType | null> {
    const result = await this.databaseClient.db.query.cart.findFirst({
      where: eq(cart.user_id, userId),
      ...this.getCartQueryWithImageSelect(),
    });
    if (!result) return null;
    return this.mapCartQuery(result);
  }

  async createCart(userId: string, data: CartDto): Promise<CartQueryEntityType | null> {
    const cartExists = await this.databaseClient.db.query.cart.findFirst({
      where: eq(cart.user_id, userId),
    });
    if (cartExists) {
      const cartProductExists = await this.databaseClient.db.query.cart_product.findFirst({
        where: and(eq(cart_product.cart_user_id, userId), eq(cart_product.product_id, data.product_id)),
      });
      if (cartProductExists) {
        await this.databaseClient.db.update(cart_product).set({ quantity: data.quantity, color_id: data.color_id }).where(and(eq(cart_product.cart_user_id, userId), eq(cart_product.product_id, data.product_id)));
        return await this.getByUserId(userId);
      }
      await this.databaseClient.db.insert(cart_product).values({ ...data, cart_user_id: userId });
      return await this.getByUserId(userId);
    }
    await this.databaseClient.db.insert(cart).values({ user_id: userId });
    await this.databaseClient.db.insert(cart_product).values({ ...data, cart_user_id: userId });
    return await this.getByUserId(userId);
  }

  async deleteCart(productId: string, userId: string): Promise<void> {
    await this.databaseClient.db.delete(cart_product).where(and(eq(cart_product.product_id, productId), eq(cart_product.cart_user_id, userId)));
    const checkCartProductsCount = await this.databaseClient.db.select({ count: count(cart_product.product_id) }).from(cart_product).where(eq(cart_product.cart_user_id, userId));
    if (checkCartProductsCount[0].count === 0) {
      await this.databaseClient.db.delete(cart).where(eq(cart.user_id, userId));
    }
  }

  async clearCart(userId: string): Promise<void> {
    await this.databaseClient.db.delete(cart_product).where(eq(cart_product.cart_user_id, userId));
    await this.databaseClient.db.delete(cart).where(eq(cart.user_id, userId));
  }
}
