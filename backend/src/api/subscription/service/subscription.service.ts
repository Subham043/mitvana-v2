import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SubscriptionServiceInterface } from '../interface/subscription.service.interface';
import { SubscriptionRepositoryInterface } from '../interface/subscription.repository.interface';
import { SUBSCRIPTION_REPOSITORY } from '../subscription.constants';
import { SubscriptionEntity } from '../entity/subscription.entity';
import { SubscriptionDto } from '../schema/subscription.schema';
import { PaginationDto } from 'src/utils/pagination/schema/pagination.schema';
import { normalizePagination, PaginationResponse } from 'src/utils/pagination/normalize.pagination';
import { CustomValidationException } from 'src/utils/validator/exception/custom-validation.exception';

@Injectable()
export class ISubscriptionService implements SubscriptionServiceInterface {

  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY) private readonly subscriptionRepository: SubscriptionRepositoryInterface,
  ) { }

  async getById(id: string): Promise<SubscriptionEntity> {
    const subscription = await this.subscriptionRepository.getById(id, { autoInvalidate: true });

    if (!subscription) throw new NotFoundException("Subscription not found");

    return subscription;
  }

  async getAll(query: PaginationDto): Promise<PaginationResponse<SubscriptionEntity>> {
    const { page, limit, offset, search } = normalizePagination(query);
    const subscriptions = await this.subscriptionRepository.getAll({ page, limit, offset, search }, { autoInvalidate: true });
    const count = await this.subscriptionRepository.count(search, { autoInvalidate: true });
    return { data: subscriptions, meta: { page, limit, total: count, search } };
  }

  async createSubscription(subscription: SubscriptionDto): Promise<SubscriptionEntity> {
    const subscriptionByEmail = await this.subscriptionRepository.getByEmail(subscription.email);

    if (subscriptionByEmail) throw new CustomValidationException("The subscription email already exists", "email", "unique");

    const newSubscription = await this.subscriptionRepository.createSubscription(subscription);

    if (!newSubscription) throw new InternalServerErrorException('Failed to create subscription');

    return newSubscription;
  }

  async updateSubscription(id: string, subscription: SubscriptionDto): Promise<SubscriptionEntity> {
    const subscriptionById = await this.subscriptionRepository.getById(id);

    if (!subscriptionById) throw new NotFoundException("Subscription not found");

    const subscriptionByEmail = await this.subscriptionRepository.getByEmail(subscription.email);

    if (subscriptionByEmail && subscriptionByEmail.email !== subscriptionById.email) throw new CustomValidationException("The subscription email already exists", "email", "unique");

    const updatedSubscription = await this.subscriptionRepository.updateSubscription(id, subscription);

    if (!updatedSubscription) throw new InternalServerErrorException('Failed to update subscription');

    return updatedSubscription;
  }

  async deleteSubscription(id: string): Promise<void> {
    const subscriptionById = await this.subscriptionRepository.getById(id);

    if (!subscriptionById) throw new NotFoundException("Subscription not found");

    await this.subscriptionRepository.deleteSubscription(id);
  }
}
