import { PaginationDto } from "src/utils/pagination/schema/pagination.schema";
import { ProductReviewQueryEntityType } from "../entity/product_review.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { ProductReviewDto } from "../schema/product_review.schema";
import { ProductReviewApprovalDto } from "../schema/product-review-approval.schema";

export interface ProductReviewServiceInterface {
    getByIdAndUserId(id: string, userId: string): Promise<ProductReviewQueryEntityType>;
    getById(id: string): Promise<ProductReviewQueryEntityType>;
    getAll(query: PaginationDto): Promise<PaginationResponse<ProductReviewQueryEntityType>>;
    getAllByUserId(query: PaginationDto, userId: string): Promise<PaginationResponse<ProductReviewQueryEntityType>>;
    getAllApproved(query: PaginationDto): Promise<PaginationResponse<ProductReviewQueryEntityType>>;
    createProductReview(userId: string, review: ProductReviewDto): Promise<ProductReviewQueryEntityType>;
    updateProductReviewStatus(id: string, review: ProductReviewApprovalDto): Promise<ProductReviewQueryEntityType>;
    deleteProductReview(id: string): Promise<void>;
}