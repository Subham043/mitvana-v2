import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { WishlistServiceInterface } from '../interface/wishlist.service.interface';
import { WishlistRepositoryInterface } from '../interface/wishlist.repository.interface';
import { WISHLIST_CACHE_KEY, WISHLIST_REPOSITORY } from '../wishlist.constants';
import { WishlistQueryEntityType } from '../entity/wishlist.entity';
import { WishlistDto } from '../schema/wishlist.schema';
import { PaginationDto } from 'src/utils/pagination/schema/pagination.schema';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { CustomValidationException } from 'src/utils/validator/exception/custom-validation.exception';
import { PRODUCT_REPOSITORY } from 'src/api/products/product.constants';
import { ProductRepositoryInterface } from 'src/api/products/interface/product.repository.interface';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class IWishlistService implements WishlistServiceInterface {

  constructor(
    @Inject(WISHLIST_REPOSITORY) private readonly wishlistRepository: WishlistRepositoryInterface,
    @Inject(PRODUCT_REPOSITORY) private readonly productRepository: ProductRepositoryInterface,
    private readonly cacheService: CacheService,
  ) { }

  async getAllByUserId(query: PaginationDto, userId: string): Promise<PaginationResponse<WishlistQueryEntityType>> {
    const { page, limit, offset, search } = normalizePagination(query);
    const cacheKey = `${WISHLIST_CACHE_KEY}:getAllByUserId:p:${page}:l:${limit}:o:${offset}:s:${search}:uid:${userId}`;
    const cachedWishlists = await this.cacheService.get<PaginationResponse<WishlistQueryEntityType>>(cacheKey);

    if (cachedWishlists) {
      return cachedWishlists;
    }

    const wishlists = await this.wishlistRepository.getAllByUserId({ page, limit, offset, search }, userId, { autoInvalidate: true });
    const count = await this.wishlistRepository.countByUserId(userId, { autoInvalidate: true });
    const result = { data: wishlists, meta: { page, limit, total: count, search } };
    await this.cacheService.set(cacheKey, result, [WISHLIST_CACHE_KEY, cacheKey]);
    return result;
  }

  async createWishlist(userId: string, wishlist: WishlistDto): Promise<WishlistQueryEntityType> {
    const product = await this.productRepository.getById(wishlist.product_id);

    if (!product) throw new CustomValidationException("Product not found", "product_id", "exist");

    if (product.is_draft) throw new CustomValidationException("Product cannot be added to wishlist", "is_draft", "not_draft");

    const newWishlist = await this.wishlistRepository.createWishlist({ ...wishlist, user_id: userId });

    if (!newWishlist) throw new InternalServerErrorException('Failed to add product to wishlist');

    await this.cacheService.invalidateTag(WISHLIST_CACHE_KEY);

    return newWishlist;
  }

  async deleteWishlist(productId: string, userId: string): Promise<void> {
    const productReviewById = await this.wishlistRepository.getByProductIdAndUserId(productId, userId, { autoInvalidate: true });

    if (!productReviewById) throw new NotFoundException("Product not found in wishlist");

    await this.wishlistRepository.deleteWishlist(productId, userId);

    await this.cacheService.invalidateTag(WISHLIST_CACHE_KEY);
  }

  async clearWishlist(userId: string): Promise<void> {
    await this.wishlistRepository.clearWishlist(userId);

    await this.cacheService.invalidateTag(WISHLIST_CACHE_KEY);
  }
}
