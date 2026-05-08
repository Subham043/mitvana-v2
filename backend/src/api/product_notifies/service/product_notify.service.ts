import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductNotifyServiceInterface } from '../interface/product_notify.service.interface';
import { ProductNotifyRepositoryInterface } from '../interface/product_notify.repository.interface';
import { PRODUCT_NOTIFY_CACHE_KEY, PRODUCT_NOTIFY_REPOSITORY } from '../product_notify.constants';
import { ProductNotifyQueryEntityType } from '../entity/product_notify.entity';
import { ProductNotifyDto } from '../schema/product_notify.schema';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { CustomValidationException } from 'src/utils/validator/exception/custom-validation.exception';
import { PRODUCT_REPOSITORY } from 'src/api/products/product.constants';
import { ProductRepositoryInterface } from 'src/api/products/interface/product.repository.interface';
import { PaginationDto } from 'src/utils/pagination/schema/pagination.schema';
import { CacheService } from 'src/cache/cache.service';
import { HelperUtil } from 'src/utils/helper.util';

@Injectable()
export class IProductNotifyService implements ProductNotifyServiceInterface {

  constructor(
    @Inject(PRODUCT_NOTIFY_REPOSITORY) private readonly productNotifyRepository: ProductNotifyRepositoryInterface,
    @Inject(PRODUCT_REPOSITORY) private readonly productRepository: ProductRepositoryInterface,
    private readonly cacheService: CacheService,
  ) { }

  async getById(id: string): Promise<ProductNotifyQueryEntityType> {
    const cacheKey = HelperUtil.generateCacheKey(PRODUCT_NOTIFY_CACHE_KEY, { id });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {
        const productNotify = await this.productNotifyRepository.getById(id, { autoInvalidate: true });

        if (!productNotify) throw new NotFoundException("Product notify not found");

        return productNotify;
      },
      options: {
        tags: [PRODUCT_NOTIFY_CACHE_KEY, cacheKey],
      },
    });
  }

  async getAll(query: PaginationDto): Promise<PaginationResponse<ProductNotifyQueryEntityType>> {
    const { page, limit, offset, search } = normalizePagination(query);
    const cacheKey = HelperUtil.generateCacheKey(PRODUCT_NOTIFY_CACHE_KEY + `:all`, { page, limit, offset, search });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {
        const productNotifys = await this.productNotifyRepository.getAll({ page, limit, offset, search }, { autoInvalidate: true });
        const count = await this.productNotifyRepository.count(search, { autoInvalidate: true });
        return { data: productNotifys, meta: { page, limit, total: count, search } };
      },
      options: {
        tags: [PRODUCT_NOTIFY_CACHE_KEY, cacheKey],
      },
    });
  }

  async createProductNotify(notify: ProductNotifyDto): Promise<ProductNotifyQueryEntityType> {
    const product = await this.productRepository.getById(notify.product_id);

    if (!product) throw new CustomValidationException("Product not found", "product_id", "exist");

    if (product.is_draft) throw new CustomValidationException("Product notify cannot be created", "is_draft", "not_draft");

    if (product.stock && product.stock > 0) throw new CustomValidationException("Product notify cannot be created", "stock", "available");

    const productNotifyByEmail = await this.productNotifyRepository.getByProductIdAndEmail(notify.product_id, notify.email);

    if (productNotifyByEmail) throw new CustomValidationException("Sorry, you have already requested to be notified when this product is back in stock.", "email", "exist");

    const newProductNotify = await this.productNotifyRepository.createProductNotify({ ...notify, });

    if (!newProductNotify) throw new InternalServerErrorException('Failed to create product notify');

    await this.cacheService.invalidateTag(PRODUCT_NOTIFY_CACHE_KEY);

    return newProductNotify;
  }

  async deleteProductNotify(id: string): Promise<void> {
    const productNotifyById = await this.productNotifyRepository.getById(id);

    if (!productNotifyById) throw new NotFoundException("Product notify not found");

    await this.productNotifyRepository.deleteProductNotify(id);

    await this.cacheService.invalidateTag(PRODUCT_NOTIFY_CACHE_KEY);
  }
}
