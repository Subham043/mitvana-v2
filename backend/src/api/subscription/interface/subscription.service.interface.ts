import { PaginationDto } from "src/utils/pagination/schema/pagination.schema";
import { NewSubscriptionEntity, SubscriptionEntity, UpdateSubscriptionEntity } from "../entity/subscription.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { PassThrough } from "stream";

export interface SubscriptionServiceInterface {
    getById(id: string): Promise<SubscriptionEntity>;
    getAll(query: PaginationDto): Promise<PaginationResponse<SubscriptionEntity>>;
    createSubscription(subscription: NewSubscriptionEntity): Promise<SubscriptionEntity>;
    updateSubscription(id: string, subscription: UpdateSubscriptionEntity): Promise<SubscriptionEntity>;
    deleteSubscription(id: string): Promise<void>;
    exportSubscriptions(query: PaginationDto): Promise<PassThrough>;
}