import { CartQueryEntityType } from "../entity/cart.entity";
import { CustomQueryCacheConfig } from "src/utils/types";
import { CartDto } from "../schema/cart.schema";

export interface CartRepositoryInterface {
    getByUserId(userId: string, cacheConfig?: CustomQueryCacheConfig): Promise<CartQueryEntityType | null>;
    createCart(userId: string, cart: CartDto): Promise<CartQueryEntityType | null>;
    deleteCart(productId: string, userId: string): Promise<CartQueryEntityType | null>;
    clearCart(userId: string): Promise<CartQueryEntityType | null>;
    applyCoupon(userId: string, coupon_code: string, cacheConfig?: CustomQueryCacheConfig): Promise<CartQueryEntityType | null>;
    removeCoupon(userId: string, cacheConfig?: CustomQueryCacheConfig): Promise<CartQueryEntityType | null>;
    selectAddress(userId: string, address_id: string, cacheConfig?: CustomQueryCacheConfig): Promise<CartQueryEntityType | null>;
}