import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewWishlistEntity, WishlistQueryEntityType } from "../entity/wishlist.entity";

export interface WishlistRepositoryInterface {
    getByProductIdAndUserId(productId: string, userId: string): Promise<WishlistQueryEntityType | null>;
    getAllByUserId(query: PaginationQuery, userId: string): Promise<WishlistQueryEntityType[]>;
    countByUserId(userId: string): Promise<number>
    createWishlist(wishlist: NewWishlistEntity): Promise<WishlistQueryEntityType | null>;
    deleteWishlist(productId: string, userId: string): Promise<void>;
    clearWishlist(userId: string): Promise<void>;
}