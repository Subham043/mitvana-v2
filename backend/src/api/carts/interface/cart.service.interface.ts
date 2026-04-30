import { CartQueryEntityType } from "../entity/cart.entity";
import { ApplyCouponDto } from "../schema/apply-coupon.schema";
import { CartDto } from "../schema/cart.schema";
import { SelectAddressDto } from "../schema/select-address.schema";

export interface CartServiceInterface {
    getByUserId(userId: string): Promise<CartQueryEntityType | null>;
    createCart(userId: string, cart: CartDto): Promise<CartQueryEntityType | null>;
    deleteCart(productId: string, userId: string): Promise<CartQueryEntityType | null>;
    clearCart(userId: string): Promise<CartQueryEntityType | null>;
    applyCoupon(userId: string, dto: ApplyCouponDto): Promise<CartQueryEntityType | null>;
    removeCoupon(userId: string): Promise<CartQueryEntityType | null>;
    selectAddress(userId: string, dto: SelectAddressDto): Promise<CartQueryEntityType | null>;
}