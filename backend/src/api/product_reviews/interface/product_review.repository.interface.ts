import { CountQuery, PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewProductReviewEntity, UpdateProductReviewEntity, ProductReviewQueryEntityType } from "../entity/product_review.entity";
import { CustomQueryCacheConfig } from "src/utils/types";
import { ProductReviewFilterDto } from "../schema/product-review-filter.schema";

export interface ProductReviewRepositoryInterface {
    getById(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<ProductReviewQueryEntityType | null>;
    getByIdAndUserId(id: string, userId: string, cacheConfig?: CustomQueryCacheConfig): Promise<ProductReviewQueryEntityType | null>;
    getAll(query: PaginationQuery<ProductReviewFilterDto>, cacheConfig?: CustomQueryCacheConfig): Promise<ProductReviewQueryEntityType[]>;
    getAllProductReviewsByUserId(query: PaginationQuery<ProductReviewFilterDto>, userId: string, cacheConfig?: CustomQueryCacheConfig): Promise<ProductReviewQueryEntityType[]>;
    getAllApprovedProductReviewsByProductId(query: PaginationQuery<ProductReviewFilterDto>, productId: string, cacheConfig?: CustomQueryCacheConfig): Promise<ProductReviewQueryEntityType[]>;
    count(query: CountQuery<ProductReviewFilterDto>, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    countProductReviewsByUserId(userId: string, query: CountQuery<ProductReviewFilterDto>, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    countApprovedProductReviewsByProductId(productId: string, query: CountQuery<ProductReviewFilterDto>, cacheConfig?: CustomQueryCacheConfig): Promise<number>
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
        averageRating: number;
        percentages: {
            one: number;
            two: number;
            three: number;
            four: number;
            five: number;
        };
    }>
}