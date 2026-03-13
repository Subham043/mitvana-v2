import { CartQueryEntityType } from "../entity/cart.entity";
import { CartDto } from "../schema/cart.schema";

export interface CartServiceInterface {
    getByUserId(userId: string): Promise<CartQueryEntityType | null>;
    createCart(userId: string, cart: CartDto): Promise<CartQueryEntityType | null>;
    deleteCart(productId: string, userId: string): Promise<void>;
    clearCart(userId: string): Promise<void>;
}