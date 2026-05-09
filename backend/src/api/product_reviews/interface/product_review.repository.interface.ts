import { CountQuery, PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewProductReviewEntity, UpdateProductReviewEntity, ProductReviewQueryEntityType } from "../entity/product_review.entity";
import { ProductReviewFilterDto } from "../schema/product-review-filter.schema";

export interface ProductReviewRepositoryInterface {
    getById(id: string): Promise<ProductReviewQueryEntityType | null>;
    getByIdAndUserId(id: string, userId: string): Promise<ProductReviewQueryEntityType | null>;
    getAll(query: PaginationQuery<ProductReviewFilterDto>): Promise<ProductReviewQueryEntityType[]>;
    getAllProductReviewsByUserId(query: PaginationQuery<ProductReviewFilterDto>, userId: string): Promise<ProductReviewQueryEntityType[]>;
    getAllApprovedProductReviewsByProductId(query: PaginationQuery<ProductReviewFilterDto>, productId: string): Promise<ProductReviewQueryEntityType[]>;
    count(query: CountQuery<ProductReviewFilterDto>): Promise<number>
    countProductReviewsByUserId(userId: string, query: CountQuery<ProductReviewFilterDto>): Promise<number>
    countApprovedProductReviewsByProductId(productId: string, query: CountQuery<ProductReviewFilterDto>): Promise<number>
    createProductReview(productReview: NewProductReviewEntity): Promise<ProductReviewQueryEntityType | null>;
    updateProductReview(id: string, productReview: UpdateProductReviewEntity): Promise<ProductReviewQueryEntityType | null>;
    deleteProductReview(id: string, userId: string): Promise<void>;
    getProductReviewRatingStats(
        productId: string,
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