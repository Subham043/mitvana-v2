import { Injectable } from '@nestjs/common';
import { SubscriptionRepositoryInterface } from '../interface/subscription.repository.interface';
import { NewSubscriptionEntity, SubscriptionEntity, UpdateSubscriptionEntity } from '../entity/subscription.entity';
import { DatabaseService } from 'src/database/database.service';
import { subscription } from 'src/database/schema/subscription.schema';
import { asc, count, eq, like } from 'drizzle-orm';
import { PaginationQuery } from 'src/utils/pagination/normalize.pagination';

@Injectable()
export class ISubscriptionRepository implements SubscriptionRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService
  ) { }

  async getByEmail(email: string): Promise<SubscriptionEntity | null> {
    const result = await this.databaseClient.db.select().from(subscription).where(eq(subscription.email, email)).limit(1);
    if (!result.length) return null;
    return result[0];
  }
  async getById(id: string): Promise<SubscriptionEntity | null> {
    const result = await this.databaseClient.db.select().from(subscription).where(eq(subscription.id, id)).limit(1);
    if (!result.length) return null;
    return result[0];
  }
  async getAll(query: PaginationQuery): Promise<SubscriptionEntity[]> {
    const { limit, offset, search } = query;
    const result = await this.databaseClient.db.select().from(subscription).where(search ? like(subscription.email, `%${search}%`) : undefined).orderBy(asc(subscription.id)).limit(limit).offset(offset);
    return result;
  }

  async count(search?: string): Promise<number> {
    const result = await this.databaseClient.db.select({ count: count(subscription.id) }).from(subscription).where(search ? like(subscription.email, `%${search}%`) : undefined);
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
