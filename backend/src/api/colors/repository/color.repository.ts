import { Injectable } from '@nestjs/common';
import { ColorRepositoryInterface } from '../interface/color.repository.interface';
import { NewColorEntity, ColorEntity, UpdateColorEntity } from '../entity/color.entity';
import { DatabaseService } from 'src/database/database.service';
import { color } from 'src/database/schema';
import { desc, count, eq, like } from 'drizzle-orm';
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
  async getAll(query: PaginationQuery, cacheConfig: CustomQueryCacheConfig = false): Promise<ColorEntity[]> {
    const { limit, offset, search } = query;
    const result = await this.databaseClient.db.select().from(color).where(search ? like(color.name, `%${search}%`) : undefined).orderBy(desc(color.createdAt)).limit(limit).offset(offset).$withCache(cacheConfig);
    return result;
  }

  async count(search?: string, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const result = await this.databaseClient.db.select({ count: count(color.id) }).from(color).where(search ? like(color.name, `%${search}%`) : undefined).$withCache(cacheConfig);
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
}
