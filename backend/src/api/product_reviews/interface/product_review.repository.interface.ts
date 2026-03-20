import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewProductReviewEntity, UpdateProductReviewEntity, ProductReviewQueryEntityType } from "../entity/product_review.entity";
import { CustomQueryCacheConfig } from "src/utils/types";

export interface ProductReviewRepositoryInterface {
    getById(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<ProductReviewQueryEntityType | null>;
    getByIdAndUserId(id: string, userId: string, cacheConfig?: CustomQueryCacheConfig): Promise<ProductReviewQueryEntityType | null>;
    getAll(query: PaginationQuery, cacheConfig?: CustomQueryCacheConfig): Promise<ProductReviewQueryEntityType[]>;
    getAllProductReviewsByUserId(query: PaginationQuery, userId: string, cacheConfig?: CustomQueryCacheConfig): Promise<ProductReviewQueryEntityType[]>;
    getAllApprovedProductReviewsByProductId(query: PaginationQuery, productId: string, cacheConfig?: CustomQueryCacheConfig): Promise<ProductReviewQueryEntityType[]>;
    count(search?: string, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    countProductReviewsByUserId(userId: string, search?: string, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    countApprovedProductReviewsByProductId(productId: string, search?: string, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    createProductReview(productReview: NewProductReviewEntity): Promise<ProductReviewQueryEntityType | null>;
    updateProductReview(id: string, productReview: UpdateProductReviewEntity): Promise<ProductReviewQueryEntityType | null>;
    deleteProductReview(id: string, userId: string): Promise<void>;
    getProductReviewRatingStats(
        productId: string,
        cacheConfig?: CustomQueryCacheConfig
    ): Promise<{
        oneRating: number;
        twoRating: number;
        threeRating: number;
        fourRating: number;
        fiveRating: number;
        total: number;
        percentages: {
            one: number;
            two: number;
            three: number;
            four: number;
            five: number;
        };
    }>
}