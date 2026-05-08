import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductReviewServiceInterface } from '../interface/product_review.service.interface';
import { ProductReviewRepositoryInterface } from '../interface/product_review.repository.interface';
import { PRODUCT_REVIEW_CACHE_KEY, PRODUCT_REVIEW_REPOSITORY } from '../product_review.constants';
import { ProductReviewQueryEntityType } from '../entity/product_review.entity';
import { ProductReviewDto } from '../schema/product_review.schema';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { CustomValidationException } from 'src/utils/validator/exception/custom-validation.exception';
import { PRODUCT_CACHE_KEY, PRODUCT_REPOSITORY } from 'src/api/products/product.constants';
import { ProductRepositoryInterface } from 'src/api/products/interface/product.repository.interface';
import { ProductReviewApprovalDto } from '../schema/product-review-approval.schema';
import { ProductReviewFilterDto } from '../schema/product-review-filter.schema';
import { CacheService } from 'src/cache/cache.service';
import { HelperUtil } from 'src/utils/helper.util';

@Injectable()
export class IProductReviewService implements ProductReviewServiceInterface {

  constructor(
    @Inject(PRODUCT_REVIEW_REPOSITORY) private readonly productReviewRepository: ProductReviewRepositoryInterface,
    @Inject(PRODUCT_REPOSITORY) private readonly productRepository: ProductRepositoryInterface,
    private readonly cacheService: CacheService,
  ) { }

  async getByIdAndUserId(id: string, userId: string): Promise<ProductReviewQueryEntityType> {
    const cacheKey = HelperUtil.generateCacheKey(PRODUCT_REVIEW_CACHE_KEY + `:u_${userId}`, { id, userId });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const productReview = await this.productReviewRepository.getByIdAndUserId(id, userId, { autoInvalidate: true });

        if (!productReview) throw new NotFoundException("Product review not found");

        return productReview;
      },
      options: {
        tags: [PRODUCT_REVIEW_CACHE_KEY, PRODUCT_REVIEW_CACHE_KEY + `:u_${userId}`, cacheKey],
      },
    });
  }

  async getById(id: string): Promise<ProductReviewQueryEntityType> {
    const cacheKey = HelperUtil.generateCacheKey(PRODUCT_REVIEW_CACHE_KEY, { id });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const productReview = await this.productReviewRepository.getById(id, { autoInvalidate: true });

        if (!productReview) throw new NotFoundException("Product review not found");

        return productReview;
      },
      options: {
        tags: [PRODUCT_REVIEW_CACHE_KEY, cacheKey],
      },
    });
  }

  async getAll(query: ProductReviewFilterDto): Promise<PaginationResponse<ProductReviewQueryEntityType, ProductReviewFilterDto>> {
    const { page, limit, offset, search, status } = normalizePagination<ProductReviewFilterDto>(query);
    const cacheKey = HelperUtil.generateCacheKey(PRODUCT_REVIEW_CACHE_KEY, { page, limit, offset, search, status });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {
        const productReviews = await this.productReviewRepository.getAll({ page, limit, offset, search, status }, { autoInvalidate: true });
        const count = await this.productReviewRepository.count({ search, status }, { autoInvalidate: true });
        return { data: productReviews, meta: { page, limit, total: count, search, status } };
      },
      options: {
        tags: [PRODUCT_REVIEW_CACHE_KEY, cacheKey],
      },
    });
  }

  async getAllProductReviewsByUserId(query: ProductReviewFilterDto, userId: string): Promise<PaginationResponse<ProductReviewQueryEntityType, ProductReviewFilterDto>> {
    const { page, limit, offset, search, status } = normalizePagination<ProductReviewFilterDto>(query);
    const cacheKey = HelperUtil.generateCacheKey(PRODUCT_REVIEW_CACHE_KEY + `:all:u_${userId}`, { page, limit, offset, search, status, userId });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {
        const productReviews = await this.productReviewRepository.getAllProductReviewsByUserId({ page, limit, offset, search, status }, userId, { autoInvalidate: true });
        const count = await this.productReviewRepository.countProductReviewsByUserId(userId, { search, status }, { autoInvalidate: true });
        return { data: productReviews, meta: { page, limit, total: count, search, status } };
      },
      options: {
        tags: [PRODUCT_REVIEW_CACHE_KEY, PRODUCT_REVIEW_CACHE_KEY + `:all:u_${userId}`, cacheKey],
      },
    });
  }

  async getAllApprovedProductReviewsByProductId(query: ProductReviewFilterDto, productId: string): Promise<PaginationResponse<ProductReviewQueryEntityType, ProductReviewFilterDto>> {
    const { page, limit, offset, search, status } = normalizePagination<ProductReviewFilterDto>(query);
    const cacheKey = HelperUtil.generateCacheKey(PRODUCT_REVIEW_CACHE_KEY + `:all:p_${productId}`, { page, limit, offset, search, status, productId });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {
        const productReviews = await this.productReviewRepository.getAllApprovedProductReviewsByProductId({ page, limit, offset, search, status }, productId, { autoInvalidate: true });
        const count = await this.productReviewRepository.countApprovedProductReviewsByProductId(productId, { search, status }, { autoInvalidate: true });
        return { data: productReviews, meta: { page, limit, total: count, search, status } };
      },
      options: {
        tags: [PRODUCT_REVIEW_CACHE_KEY, PRODUCT_REVIEW_CACHE_KEY + `:all:p_${productId}`, cacheKey],
      },
    });
  }

  async createProductReview(userId: string, review: ProductReviewDto): Promise<ProductReviewQueryEntityType> {
    const product = await this.productRepository.getById(review.product_id);

    if (!product) throw new CustomValidationException("Product not found", "product_id", "exist");

    if (product.is_draft) throw new CustomValidationException("Product review cannot be created", "is_draft", "not_draft");

    const newProductReview = await this.productReviewRepository.createProductReview({ ...review, user_id: userId });

    if (!newProductReview) throw new InternalServerErrorException('Failed to create product review');

    await this.cacheService.invalidateTag(PRODUCT_REVIEW_CACHE_KEY);

    return newProductReview;
  }

  async updateProductReviewStatus(id: string, review: ProductReviewApprovalDto): Promise<ProductReviewQueryEntityType> {
    const productReviewById = await this.productReviewRepository.getById(id);

    if (!productReviewById) throw new NotFoundException("Product review not found");

    const updatedProductReview = await this.productReviewRepository.updateProductReview(id, review);

    if (!updatedProductReview) throw new InternalServerErrorException('Failed to update product review');

    await this.cacheService.invalidateTag(PRODUCT_REVIEW_CACHE_KEY);

    await this.cacheService.invalidateTag(PRODUCT_CACHE_KEY);

    return updatedProductReview;
  }

  async deleteProductReview(id: string): Promise<void> {
    const productReviewById = await this.productReviewRepository.getById(id);

    if (!productReviewById) throw new NotFoundException("Product review not found");

    await this.productReviewRepository.deleteProductReview(id, productReviewById.user.id);

    await this.cacheService.invalidateTag(PRODUCT_REVIEW_CACHE_KEY);
  }

  async getProductReviewRatingStats(productId: string): Promise<{
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
  }> {
    const cacheKey = HelperUtil.generateCacheKey(PRODUCT_REVIEW_CACHE_KEY + `:rating_stats_p_${productId}`, { productId });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        return await this.productReviewRepository.getProductReviewRatingStats(productId, { autoInvalidate: true });
      },
      options: {
        tags: [PRODUCT_REVIEW_CACHE_KEY, PRODUCT_REVIEW_CACHE_KEY + `:r_${productId}`, cacheKey],
      },
    });
  }
}
