import { ProductReviewQueryEntityType } from "../entity/product_review.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { ProductReviewDto } from "../schema/product_review.schema";
import { ProductReviewApprovalDto } from "../schema/product-review-approval.schema";
import { ProductReviewFilterDto } from "../schema/product-review-filter.schema";

export interface ProductReviewServiceInterface {
    getByIdAndUserId(id: string, userId: string): Promise<ProductReviewQueryEntityType>;
    getById(id: string): Promise<ProductReviewQueryEntityType>;
    getAll(query: ProductReviewFilterDto): Promise<PaginationResponse<ProductReviewQueryEntityType, Omit<ProductReviewFilterDto, 'page' | 'limit' | 'offset' | 'search'>>>;
    getAllProductReviewsByUserId(query: ProductReviewFilterDto, userId: string): Promise<PaginationResponse<ProductReviewQueryEntityType, Omit<ProductReviewFilterDto, 'page' | 'limit' | 'offset' | 'search'>>>;
    getAllApprovedProductReviewsByProductId(query: ProductReviewFilterDto, productId: string): Promise<PaginationResponse<ProductReviewQueryEntityType, Omit<ProductReviewFilterDto, 'page' | 'limit' | 'offset' | 'search'>>>;
    createProductReview(userId: string, review: ProductReviewDto): Promise<ProductReviewQueryEntityType>;
    updateProductReviewStatus(id: string, review: ProductReviewApprovalDto): Promise<ProductReviewQueryEntityType>;
    deleteProductReview(id: string): Promise<void>;
    getProductReviewRatingStats(
        productId: string,
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