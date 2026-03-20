import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductReviewServiceInterface } from '../interface/product_review.service.interface';
import { ProductReviewRepositoryInterface } from '../interface/product_review.repository.interface';
import { PRODUCT_REVIEW_REPOSITORY } from '../product_review.constants';
import { ProductReviewQueryEntityType } from '../entity/product_review.entity';
import { ProductReviewDto } from '../schema/product_review.schema';
import { PaginationDto } from 'src/utils/pagination/schema/pagination.schema';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { CustomValidationException } from 'src/utils/validator/exception/custom-validation.exception';
import { PRODUCT_REPOSITORY } from 'src/api/products/product.constants';
import { ProductRepositoryInterface } from 'src/api/products/interface/product.repository.interface';
import { ProductReviewApprovalDto } from '../schema/product-review-approval.schema';

@Injectable()
export class IProductReviewService implements ProductReviewServiceInterface {

  constructor(
    @Inject(PRODUCT_REVIEW_REPOSITORY) private readonly productReviewRepository: ProductReviewRepositoryInterface,
    @Inject(PRODUCT_REPOSITORY) private readonly productRepository: ProductRepositoryInterface,
  ) { }

  async getByIdAndUserId(id: string, userId: string): Promise<ProductReviewQueryEntityType> {
    const productReview = await this.productReviewRepository.getByIdAndUserId(id, userId, { autoInvalidate: true });

    if (!productReview) throw new NotFoundException("Product review not found");

    return productReview;
  }

  async getById(id: string): Promise<ProductReviewQueryEntityType> {
    const productReview = await this.productReviewRepository.getById(id, { autoInvalidate: true });

    if (!productReview) throw new NotFoundException("Product review not found");

    return productReview;
  }

  async getAll(query: PaginationDto): Promise<PaginationResponse<ProductReviewQueryEntityType>> {
    const { page, limit, offset, search } = normalizePagination(query);
    const productReviews = await this.productReviewRepository.getAll({ page, limit, offset, search }, { autoInvalidate: true });
    const count = await this.productReviewRepository.count(search, { autoInvalidate: true });
    return { data: productReviews, meta: { page, limit, total: count, search } };
  }

  async getAllByUserId(query: PaginationDto, userId: string): Promise<PaginationResponse<ProductReviewQueryEntityType>> {
    const { page, limit, offset, search } = normalizePagination(query);
    const productReviews = await this.productReviewRepository.getAllByUserId({ page, limit, offset, search }, userId, { autoInvalidate: true });
    const count = await this.productReviewRepository.countByUserId(userId, search, { autoInvalidate: true });
    return { data: productReviews, meta: { page, limit, total: count, search } };
  }

  async getAllApproved(query: PaginationDto): Promise<PaginationResponse<ProductReviewQueryEntityType>> {
    const { page, limit, offset, search } = normalizePagination(query);
    const productReviews = await this.productReviewRepository.getAllApproved({ page, limit, offset, search }, { autoInvalidate: true });
    const count = await this.productReviewRepository.countApproved(search, { autoInvalidate: true });
    return { data: productReviews, meta: { page, limit, total: count, search } };
  }

  async createProductReview(userId: string, review: ProductReviewDto): Promise<ProductReviewQueryEntityType> {
    const product = await this.productRepository.getById(review.product_id);

    if (!product) throw new CustomValidationException("Product not found", "product_id", "exist");

    if (product.is_draft) throw new CustomValidationException("Product review cannot be created", "is_draft", "not_draft");

    const newProductReview = await this.productReviewRepository.createProductReview({ ...review, user_id: userId });

    if (!newProductReview) throw new InternalServerErrorException('Failed to create product review');

    return newProductReview;
  }

  async updateProductReviewStatus(id: string, review: ProductReviewApprovalDto): Promise<ProductReviewQueryEntityType> {
    const productReviewById = await this.productReviewRepository.getById(id);

    if (!productReviewById) throw new NotFoundException("Product review not found");

    const updatedProductReview = await this.productReviewRepository.updateProductReview(id, review);

    if (!updatedProductReview) throw new InternalServerErrorException('Failed to update product review');

    return updatedProductReview;
  }

  async deleteProductReview(id: string): Promise<void> {
    const productReviewById = await this.productReviewRepository.getById(id);

    if (!productReviewById) throw new NotFoundException("Product review not found");

    await this.productReviewRepository.deleteProductReview(id, productReviewById.user.id);
  }
}
