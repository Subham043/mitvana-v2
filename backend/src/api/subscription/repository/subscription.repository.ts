import { Injectable } from '@nestjs/common';
import { SubscriptionRepositoryInterface } from '../interface/subscription.repository.interface';
import { NewSubscriptionEntity, SubscriptionEntity, UpdateSubscriptionEntity } from '../entity/subscription.entity';
import { DatabaseService } from 'src/database/database.service';
import { subscription } from 'src/database/schema';
import { desc, count, eq, like, SQL, and } from 'drizzle-orm';
import { PaginationQuery } from 'src/utils/pagination/normalize.pagination';
import { CustomQueryCacheConfig } from "src/utils/types";

@Injectable()
export class ISubscriptionRepository implements SubscriptionRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService
  ) { }

  async getByEmail(email: string, cacheConfig: CustomQueryCacheConfig = false): Promise<SubscriptionEntity | null> {
    const result = await this.databaseClient.db.select().from(subscription).where(eq(subscription.email, email)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    return result[0];
  }
  async getById(id: string, cacheConfig: CustomQueryCacheConfig = false): Promise<SubscriptionEntity | null> {
    const result = await this.databaseClient.db.select().from(subscription).where(eq(subscription.id, id)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    return result[0];
  }

  private async filters(search: string = ""): Promise<SQL<unknown> | undefined> {
    const filters: SQL[] = [];
    if (search.length > 0) {
      filters.push(like(subscription.email, `%${search}%`));
    }
    return filters.length > 0 ? and(...filters) : undefined;
  }

  async getAll(query: PaginationQuery, cacheConfig: CustomQueryCacheConfig = false): Promise<SubscriptionEntity[]> {
    const { limit, offset, search } = query;
    const filters = await this.filters(search);
    const result = await this.databaseClient.db.select().from(subscription).where(filters).orderBy(desc(subscription.createdAt)).limit(limit).offset(offset).$withCache(cacheConfig);
    return result;
  }

  async count(search?: string, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const filters = await this.filters(search);
    const result = await this.databaseClient.db.select({ count: count(subscription.id) }).from(subscription).where(filters).$withCache(cacheConfig);
    return result[0].count;
  }
  async createSubscription(data: NewSubscriptionEntity): Promise<SubscriptionEntity | null> {
    const result = await this.databaseClient.db.insert(subscription).values(data).$returningId();
    return await this.getById(result[0].id);
  }
  async updateSubscription(id: string, data: UpdateSubscriptionEntity): Promise<SubscriptionEntity | null> {
    await this.databaseClient.db.update(subscription).set(data).where(eq(subscription.id, id));
    return await this.getById(id);
  }
  async deleteSubscription(id: string): Promise<void> {
    await this.databaseClient.db.delete(subscription).where(eq(subscription.id, id));
  }
}
