import { Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '../interface/user.repository.interface';
import { NewMainUserEntity, UpdateMainUserEntity, MainUserEntity, UserSelect } from '../entity/user.entity';
import { DatabaseService } from 'src/database/database.service';
import { users } from 'src/database/schema';
import { and, count, desc, eq, isNotNull, isNull, like, or, SQL, sql } from 'drizzle-orm';
import { CustomQueryCacheConfig } from "src/utils/types";
import { PaginationQuery } from 'src/utils/pagination/normalize.pagination';
import { UserFilterDto } from '../schema/user-filter.schema';

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

  private async filters(search: string = "", is_blocked?: boolean, is_verified?: boolean): Promise<SQL<unknown> | undefined> {
    const searchFilters: SQL[] = [];
    const filters: SQL[] = [];
    if (search.length > 0) {
      searchFilters.push(like(users.name, `%${search}%`));
      searchFilters.push(like(users.email, `%${search}%`));
      searchFilters.push(like(users.phone, `%${search}%`));
    }
    if (is_blocked !== undefined) {
      filters.push(eq(users.is_blocked, is_blocked));
    }
    if (is_verified !== undefined) {
      if (is_verified) {
        filters.push(isNotNull(users.email_verified_at));
      } else {
        filters.push(isNull(users.email_verified_at));
      }
    }
    //or for searchFilters and and for filters
    const searchCondition = searchFilters.length > 0 ? or(...searchFilters) : undefined;
    const filterCondition = filters.length > 0 ? and(...filters) : undefined;
    return searchCondition && filterCondition ? and(searchCondition, filterCondition) : searchCondition || filterCondition;
  }

  async getAll(query: PaginationQuery<UserFilterDto>, cacheConfig: CustomQueryCacheConfig = false): Promise<MainUserEntity[]> {
    const { limit, offset, search, is_blocked, is_verified } = query;
    const filters = await this.filters(search, is_blocked, is_verified);
    const result = await this.databaseClient.db.select(UserSelect).from(users).where(filters).orderBy(desc(users.createdAt)).limit(limit).offset(offset).$withCache(cacheConfig);
    return result;
  }

  async count(query: Omit<PaginationQuery<UserFilterDto>, 'offset' | 'limit' | 'page'>, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const { search, is_blocked, is_verified } = query;
    const filters = await this.filters(search, is_blocked, is_verified);
    const result = await this.databaseClient.db.select({ count: count(users.id) }).from(users).where(filters).$withCache(cacheConfig);
    return result[0].count;
  }

  async toggleUserBlock(id: string, is_blocked: boolean): Promise<MainUserEntity | null> {
    await this.databaseClient.db.update(users).set({ is_blocked }).where(eq(users.id, id));
    return await this.getById(id);
  }

  async verifyUser(id: string): Promise<MainUserEntity | null> {
    await this.databaseClient.db.update(users).set({ email_verified_at: new Date() }).where(eq(users.id, id));
    return await this.getById(id);
  }
}
