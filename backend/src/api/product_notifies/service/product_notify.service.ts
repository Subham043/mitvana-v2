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

@Injectable()
export class IProductNotifyService implements ProductNotifyServiceInterface {

  constructor(
    @Inject(PRODUCT_NOTIFY_REPOSITORY) private readonly productNotifyRepository: ProductNotifyRepositoryInterface,
    @Inject(PRODUCT_REPOSITORY) private readonly productRepository: ProductRepositoryInterface,
    private readonly cacheService: CacheService,
  ) { }

  async getById(id: string): Promise<ProductNotifyQueryEntityType> {
    const cacheKey = `${PRODUCT_NOTIFY_CACHE_KEY}:id:${id}`;
    const cachedProductNotify = await this.cacheService.get<ProductNotifyQueryEntityType>(cacheKey);

    if (cachedProductNotify) {
      return cachedProductNotify;
    }

    const productNotify = await this.productNotifyRepository.getById(id, { autoInvalidate: true });

    if (!productNotify) throw new NotFoundException("Product notify not found");

    await this.cacheService.set(cacheKey, productNotify, [PRODUCT_NOTIFY_CACHE_KEY, cacheKey]);

    return productNotify;
  }

  async getAll(query: PaginationDto): Promise<PaginationResponse<ProductNotifyQueryEntityType>> {
    const { page, limit, offset, search } = normalizePagination(query);
    const cacheKey = `${PRODUCT_NOTIFY_CACHE_KEY}:all:p:${page}:l:${limit}:o:${offset}:s:${search}`;
    const cachedProductNotifys = await this.cacheService.get<PaginationResponse<ProductNotifyQueryEntityType>>(cacheKey);

    if (cachedProductNotifys) {
      return cachedProductNotifys;
    }

    const productNotifys = await this.productNotifyRepository.getAll({ page, limit, offset, search }, { autoInvalidate: true });
    const count = await this.productNotifyRepository.count(search, { autoInvalidate: true });
    const result = { data: productNotifys, meta: { page, limit, total: count, search } };
    await this.cacheService.set(cacheKey, result, [PRODUCT_NOTIFY_CACHE_KEY, cacheKey]);
    return result;
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
