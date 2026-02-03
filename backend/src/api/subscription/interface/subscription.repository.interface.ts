import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewSubscriptionEntity, UpdateSubscriptionEntity, SubscriptionEntity } from "../entity/subscription.entity";
import { CustomQueryCacheConfig } from "src/utils/types";

export interface SubscriptionRepositoryInterface {
    getByEmail(email: string, cacheConfig?: CustomQueryCacheConfig): Promise<SubscriptionEntity | null>;
    getById(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<SubscriptionEntity | null>;
    getAll(query: PaginationQuery, cacheConfig?: CustomQueryCacheConfig): Promise<SubscriptionEntity[]>;
    count(search?: string, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    createSubscription(subscription: NewSubscriptionEntity): Promise<SubscriptionEntity | null>;
    updateSubscription(id: string, subscription: UpdateSubscriptionEntity): Promise<SubscriptionEntity | null>;
    deleteSubscription(id: string): Promise<void>;
}