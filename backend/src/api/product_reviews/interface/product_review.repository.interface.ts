import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewProductReviewEntity, UpdateProductReviewEntity, ProductReviewQueryEntityType } from "../entity/product_review.entity";
import { CustomQueryCacheConfig } from "src/utils/types";

export interface ProductReviewRepositoryInterface {
    getById(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<ProductReviewQueryEntityType | null>;
    getByIdAndUserId(id: string, userId: string, cacheConfig?: CustomQueryCacheConfig): Promise<ProductReviewQueryEntityType | null>;
    getAll(query: PaginationQuery, cacheConfig?: CustomQueryCacheConfig): Promise<ProductReviewQueryEntityType[]>;
    getAllByUserId(query: PaginationQuery, userId: string, cacheConfig?: CustomQueryCacheConfig): Promise<ProductReviewQueryEntityType[]>;
    getAllApproved(query: PaginationQuery, cacheConfig?: CustomQueryCacheConfig): Promise<ProductReviewQueryEntityType[]>;
    count(search?: string, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    countByUserId(userId: string, search?: string, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    countApproved(search?: string, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    createProductReview(productReview: NewProductReviewEntity): Promise<ProductReviewQueryEntityType | null>;
    updateProductReview(id: string, productReview: UpdateProductReviewEntity): Promise<ProductReviewQueryEntityType | null>;
    deleteProductReview(id: string, userId: string): Promise<void>;
}