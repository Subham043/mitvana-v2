import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SubscriptionServiceInterface } from '../interface/subscription.service.interface';
import { SubscriptionRepositoryInterface } from '../interface/subscription.repository.interface';
import { SUBSCRIPTION_CACHE_KEY, SUBSCRIPTION_REPOSITORY } from '../subscription.constants';
import { SubscriptionEntity } from '../entity/subscription.entity';
import { SubscriptionDto } from '../schema/subscription.schema';
import { PaginationDto } from 'src/utils/pagination/schema/pagination.schema';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { CustomValidationException } from 'src/utils/validator/exception/custom-validation.exception';
import { exportExcelStream } from 'src/utils/excel/excel-export.util';
import { PassThrough } from 'stream';
import { CacheService } from 'src/cache/cache.service';
import { HelperUtil } from 'src/utils/helper.util';

@Injectable()
export class ISubscriptionService implements SubscriptionServiceInterface {

  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY) private readonly subscriptionRepository: SubscriptionRepositoryInterface,
    private readonly cacheService: CacheService
  ) { }

  async getById(id: string): Promise<SubscriptionEntity> {
    const cacheKey = HelperUtil.generateCacheKey(SUBSCRIPTION_CACHE_KEY, { id });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const subscription = await this.subscriptionRepository.getById(id, { autoInvalidate: true });

        if (!subscription) throw new NotFoundException("Subscription not found");

        return subscription;
      },
      options: {
        tags: [SUBSCRIPTION_CACHE_KEY, cacheKey],
      },
    });
  }

  async getAll(query: PaginationDto): Promise<PaginationResponse<SubscriptionEntity>> {
    const { page, limit, offset, search } = normalizePagination(query);

    const cacheKey = HelperUtil.generateCacheKey(SUBSCRIPTION_CACHE_KEY, { page, limit, offset, search });

    return this.cacheService.wrap({
      key: cacheKey,
      callback: async () => {

        const subscriptions = await this.subscriptionRepository.getAll({ page, limit, offset, search }, { autoInvalidate: true });
        const count = await this.subscriptionRepository.count(search, { autoInvalidate: true });

        return { data: subscriptions, meta: { page, limit, total: count, search } };
      },
      options: {
        tags: [SUBSCRIPTION_CACHE_KEY, cacheKey],
      },
    });
  }

  async createSubscription(subscription: SubscriptionDto): Promise<SubscriptionEntity> {
    const subscriptionByEmail = await this.subscriptionRepository.getByEmail(subscription.email);

    if (subscriptionByEmail) throw new CustomValidationException("The subscription email already exists", "email", "unique");

    const newSubscription = await this.subscriptionRepository.createSubscription(subscription);

    if (!newSubscription) throw new InternalServerErrorException('Failed to create subscription');

    await this.cacheService.invalidateTag(SUBSCRIPTION_CACHE_KEY);

    return newSubscription;
  }

  async updateSubscription(id: string, subscription: SubscriptionDto): Promise<SubscriptionEntity> {
    const subscriptionById = await this.subscriptionRepository.getById(id);

    if (!subscriptionById) throw new NotFoundException("Subscription not found");

    const subscriptionByEmail = await this.subscriptionRepository.getByEmail(subscription.email);

    if (subscriptionByEmail && subscriptionByEmail.email !== subscriptionById.email) throw new CustomValidationException("The subscription email already exists", "email", "unique");

    const updatedSubscription = await this.subscriptionRepository.updateSubscription(id, subscription);

    if (!updatedSubscription) throw new InternalServerErrorException('Failed to update subscription');

    await this.cacheService.invalidateTag(SUBSCRIPTION_CACHE_KEY);

    return updatedSubscription;
  }

  async deleteSubscription(id: string): Promise<void> {
    const subscriptionById = await this.subscriptionRepository.getById(id);

    if (!subscriptionById) throw new NotFoundException("Subscription not found");

    await this.subscriptionRepository.deleteSubscription(id);

    await this.cacheService.invalidateTag(SUBSCRIPTION_CACHE_KEY);
  }

  async exportSubscriptions(query: PaginationDto): Promise<PassThrough> {
    return exportExcelStream({
      sheetName: 'Subscriptions',

      columns: [
        { header: 'ID', key: 'id', width: 30 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Created At', key: 'createdAt', width: 20 },
        { header: 'Updated At', key: 'updatedAt', width: 20 },
      ],

      fetchBatch: async (offset, limit) => {
        const { page, search: searchString } = normalizePagination({
          page: 1,
          limit,
          search: query.search,
        })

        return this.subscriptionRepository.getAll({
          page,
          limit,
          offset,
          search: searchString,
        })
      },

      mapRow: (subscription) => ({
        id: subscription.id,
        email: subscription.email,
        createdAt: subscription.createdAt?.toISOString(),
        updatedAt: subscription.updatedAt?.toISOString(),
      }),
    })
  }
}
