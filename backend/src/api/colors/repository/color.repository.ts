import { Injectable } from '@nestjs/common';
import { ColorRepositoryInterface } from '../interface/color.repository.interface';
import { NewColorEntity, ColorEntity, UpdateColorEntity } from '../entity/color.entity';
import { DatabaseService } from 'src/database/database.service';
import { color } from 'src/database/schema';
import { desc, count, eq, like, inArray, SQL, or } from 'drizzle-orm';
import { PaginationQuery } from 'src/utils/pagination/normalize.pagination';
import { CustomQueryCacheConfig } from "src/utils/types";

@Injectable()
export class IColorRepository implements ColorRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService
  ) { }
  async getById(id: string, cacheConfig: CustomQueryCacheConfig = false): Promise<ColorEntity | null> {
    const result = await this.databaseClient.db.select().from(color).where(eq(color.id, id)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    return result[0];
  }

  private async filters(search: string = ""): Promise<SQL<unknown> | undefined> {
    const filters: SQL[] = [];
    if (search.length > 0) {
      filters.push(like(color.name, `%${search}%`));
      filters.push(like(color.code, `%${search}%`));
    }
    return filters.length > 0 ? or(...filters) : undefined;
  }

  async getAll(query: PaginationQuery, cacheConfig: CustomQueryCacheConfig = false): Promise<ColorEntity[]> {
    const { limit, offset, search } = query;
    const filters = await this.filters(search);
    const result = await this.databaseClient.db.select().from(color).where(filters).orderBy(desc(color.createdAt)).limit(limit).offset(offset).$withCache(cacheConfig);
    return result;
  }

  async count(search?: string, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const filters = await this.filters(search);
    const result = await this.databaseClient.db.select({ count: count(color.id) }).from(color).where(filters).$withCache(cacheConfig);
    return result[0].count;
  }
  async createColor(data: NewColorEntity): Promise<ColorEntity | null> {
    const result = await this.databaseClient.db.insert(color).values(data).$returningId();
    return await this.getById(result[0].id);
  }
  async updateColor(id: string, data: UpdateColorEntity): Promise<ColorEntity | null> {
    await this.databaseClient.db.update(color).set(data).where(eq(color.id, id));
    return await this.getById(id);
  }
  async deleteColor(id: string): Promise<void> {
    await this.databaseClient.db.delete(color).where(eq(color.id, id));
  }
  async checkIdsExists(ids: string[], cacheConfig: CustomQueryCacheConfig = false): Promise<{ id: string; exists: boolean }[]> {
    const result = await this.databaseClient.db.select({ id: color.id }).from(color).where(inArray(color.id, ids)).$withCache(cacheConfig);
    return ids.map((id) => ({ id, exists: result.some((item) => item.id === id) }));
  }
}
