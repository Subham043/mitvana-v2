import { Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../interface/user.repository.interface';
import { NewMainUserEntity, UpdateMainUserEntity, MainUserEntity, UserSelect } from '../entity/user.entity';
import { DatabaseService } from 'src/database/database.service';
import { users } from 'src/database/schema';
import { count, desc, eq, like, sql } from 'drizzle-orm';
import { CustomQueryCacheConfig } from "src/utils/types";
import { PaginationQuery } from 'src/utils/pagination/normalize.pagination';

@Injectable()
export class IUserRepository implements UserRepositoryInterface {

  constructor(
    private readonly databaseClient: DatabaseService
  ) { }

  async getByEmail(email: string, cacheConfig: CustomQueryCacheConfig = false): Promise<MainUserEntity | null> {
    const result = await this.databaseClient.db.select(UserSelect).from(users).where(eq(users.email, email)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    const user = result[0];
    return user;
  }
  async getByPhone(phone: string, cacheConfig: CustomQueryCacheConfig = false): Promise<MainUserEntity | null> {
    const result = await this.databaseClient.db.select(UserSelect).from(users).where(eq(users.phone, phone)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    const user = result[0];
    return user;
  }
  async getById(id: string, cacheConfig: CustomQueryCacheConfig = false): Promise<MainUserEntity | null> {
    const result = await this.databaseClient.db.select(UserSelect).from(users).where(eq(users.id, id)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    const user = result[0];
    return user;
  }
  async createUser(user: NewMainUserEntity): Promise<MainUserEntity | null> {
    const result = await this.databaseClient.db.insert(users).values(user).$returningId();
    return await this.getById(result[0].id);
  }
  async updateUser(id: string, user: UpdateMainUserEntity): Promise<MainUserEntity | null> {
    await this.databaseClient.db.update(users).set(user).where(eq(users.id, id));
    return await this.getById(id);
  }
  async deleteUser(id: string): Promise<void> {
    await this.databaseClient.db.delete(users).where(eq(users.id, id));
  }
  async getAll(query: PaginationQuery, cacheConfig: CustomQueryCacheConfig = false): Promise<MainUserEntity[]> {
    const { limit, offset, search } = query;
    const result = await this.databaseClient.db.select(UserSelect).from(users).where(search ? like(users.name, `%${search}%`) : undefined).orderBy(desc(users.createdAt)).limit(limit).offset(offset).$withCache(cacheConfig);
    return result;
  }

  async count(search?: string, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const result = await this.databaseClient.db.select({ count: count(users.id) }).from(users).where(search ? like(users.name, `%${search}%`) : undefined).$withCache(cacheConfig);
    return result[0].count;
  }

  async toggleUserBlock(id: string, is_blocked: boolean): Promise<MainUserEntity | null> {
    await this.databaseClient.db.update(users).set({ is_blocked }).where(eq(users.id, id));
    return await this.getById(id);
  }

  async verifyUser(id: string): Promise<MainUserEntity | null> {
    await this.databaseClient.db.update(users).set({ email_verified_at: new Date(), verification_code: null }).where(eq(users.id, id));
    return await this.getById(id);
  }
}
