import { PaginationDto } from "src/utils/pagination/schema/pagination.schema";
import { WishlistQueryEntityType } from "../entity/wishlist.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { WishlistDto } from "../schema/wishlist.schema";

export interface WishlistServiceInterface {
    getAllByUserId(query: PaginationDto, userId: string): Promise<PaginationResponse<WishlistQueryEntityType>>;
    createWishlist(userId: string, wishlist: WishlistDto): Promise<WishlistQueryEntityType>;
    deleteWishlist(productId: string, userId: string): Promise<void>;
    clearWishlist(userId: string): Promise<void>;
}