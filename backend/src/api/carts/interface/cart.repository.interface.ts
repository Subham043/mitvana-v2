import { CartQueryEntityType } from "../entity/cart.entity";
import { CustomQueryCacheConfig } from "src/utils/types";
import { CartDto } from "../schema/cart.schema";

export interface CartRepositoryInterface {
    getByUserId(userId: string, cacheConfig?: CustomQueryCacheConfig): Promise<CartQueryEntityType | null>;
    createCart(userId: string, cart: CartDto): Promise<CartQueryEntityType | null>;
    deleteCart(productId: string, userId: string): Promise<void>;
    clearCart(userId: string): Promise<void>;
}