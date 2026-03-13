import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewWishlistEntity, WishlistQueryEntityType } from "../entity/wishlist.entity";
import { CustomQueryCacheConfig } from "src/utils/types";

export interface WishlistRepositoryInterface {
    getByProductIdAndUserId(productId: string, userId: string, cacheConfig?: CustomQueryCacheConfig): Promise<WishlistQueryEntityType | null>;
    getAllByUserId(query: PaginationQuery, userId: string, cacheConfig?: CustomQueryCacheConfig): Promise<WishlistQueryEntityType[]>;
    countByUserId(userId: string, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    createWishlist(wishlist: NewWishlistEntity): Promise<WishlistQueryEntityType | null>;
    deleteWishlist(productId: string, userId: string): Promise<void>;
    clearWishlist(userId: string): Promise<void>;
}