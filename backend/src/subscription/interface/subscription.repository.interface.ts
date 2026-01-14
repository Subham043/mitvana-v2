import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewSubscriptionEntity, UpdateSubscriptionEntity, SubscriptionEntity } from "../entity/subscription.entity";

export interface SubscriptionRepositoryInterface {
    getByEmail(email: string): Promise<SubscriptionEntity | null>;
    getById(id: string): Promise<SubscriptionEntity | null>;
    getAll(query: PaginationQuery): Promise<SubscriptionEntity[]>;
    count(search?: string): Promise<number>
    createSubscription(subscription: NewSubscriptionEntity): Promise<SubscriptionEntity | null>;
    updateSubscription(id: string, subscription: UpdateSubscriptionEntity): Promise<SubscriptionEntity | null>;
    deleteSubscription(id: string): Promise<void>;
}