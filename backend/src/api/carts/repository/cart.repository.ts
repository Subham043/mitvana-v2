import { Injectable } from '@nestjs/common';
import { CartRepositoryInterface } from '../interface/cart.repository.interface';
import { CartQueryEntityType, CartSelect } from '../entity/cart.entity';
import { DatabaseService } from 'src/database/database.service';
import { cart } from 'src/database/schema/cart.schema';
import { and, count, eq } from 'drizzle-orm';
import { CustomQueryCacheConfig } from 'src/utils/types';
import { ConfigService } from '@nestjs/config';
import { CartDto } from '../schema/cart.schema';
import { cart_product, color, product, users } from 'src/database/schema';
import { AppConfigType } from 'src/config/schema';

@Injectable()
export class ICartRepository implements CartRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService,
    private readonly configService: ConfigService<AppConfigType>
  ) { }
  private getCartQuery() {
    return this.databaseClient.db
      .select(CartSelect(
        `${this.configService.get('APP_URL')}/uploads/`,
      ))
      .from(cart)
      .leftJoin(cart_product, eq(cart.user_id, cart_product.cart_user_id))
      .leftJoin(product, eq(cart_product.product_id, product.id))
      .leftJoin(color, eq(cart_product.color_id, color.id))
      .leftJoin(users, eq(cart.user_id, users.id))
      .groupBy(cart.user_id);
  }
  async getByUserId(userId: string, cacheConfig: CustomQueryCacheConfig = false): Promise<CartQueryEntityType | null> {
    const result = await this.getCartQuery()
      .where(eq(cart.user_id, userId))
      .limit(1)
      .$withCache(cacheConfig);
    if (!result.length) return null;
    return result[0];
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

  async deleteCart(productId: string, userId: string): Promise<CartQueryEntityType | null> {
    await this.databaseClient.db.delete(cart_product).where(and(eq(cart_product.product_id, productId), eq(cart_product.cart_user_id, userId)));
    const checkCartProductsCount = await this.databaseClient.db.select({ count: count(cart_product.product_id) }).from(cart_product).where(eq(cart_product.cart_user_id, userId));
    if (checkCartProductsCount[0].count === 0) {
      await this.databaseClient.db.delete(cart).where(eq(cart.user_id, userId));
    }
    return await this.getByUserId(userId);
  }

  async clearCart(userId: string): Promise<CartQueryEntityType | null> {
    await this.databaseClient.db.delete(cart_product).where(eq(cart_product.cart_user_id, userId));
    await this.databaseClient.db.delete(cart).where(eq(cart.user_id, userId));
    return await this.getByUserId(userId);
  }
}
