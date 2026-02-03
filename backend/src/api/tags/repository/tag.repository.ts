import { Injectable } from '@nestjs/common';
import { TagRepositoryInterface } from '../interface/tag.repository.interface';
import { NewTagEntity, TagEntity, UpdateTagEntity } from '../entity/tag.entity';
import { DatabaseService } from 'src/database/database.service';
import { tag } from 'src/database/schema/tag.schema';
import { desc, count, eq, like } from 'drizzle-orm';
import { PaginationQuery } from 'src/utils/pagination/normalize.pagination';
import { CustomQueryCacheConfig } from 'src/utils/types';

@Injectable()
export class ITagRepository implements TagRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService
  ) { }
  async getByName(name: string, cacheConfig: CustomQueryCacheConfig = false): Promise<TagEntity | null> {
    const result = await this.databaseClient.db.select().from(tag).where(eq(tag.name, name)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    return result[0];
  }
  async getById(id: string, cacheConfig: CustomQueryCacheConfig = false): Promise<TagEntity | null> {
    const result = await this.databaseClient.db.select().from(tag).where(eq(tag.id, id)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    return result[0];
  }
  async getAll(query: PaginationQuery, cacheConfig: CustomQueryCacheConfig = false): Promise<TagEntity[]> {
    const { limit, offset, search } = query;
    const result = await this.databaseClient.db.select().from(tag).where(search ? like(tag.name, `%${search}%`) : undefined).orderBy(desc(tag.createdAt)).limit(limit).offset(offset).$withCache(cacheConfig);
    return result;
  }

  async count(search?: string, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const result = await this.databaseClient.db.select({ count: count(tag.id) }).from(tag).where(search ? like(tag.name, `%${search}%`) : undefined).$withCache(cacheConfig);
    return result[0].count;
  }
  async createTag(data: NewTagEntity): Promise<TagEntity | null> {
    const result = await this.databaseClient.db.insert(tag).values(data).$returningId();
    return await this.getById(result[0].id);
  }
  async updateTag(id: string, data: UpdateTagEntity): Promise<TagEntity | null> {
    await this.databaseClient.db.update(tag).set(data).where(eq(tag.id, id));
    return await this.getById(id);
  }
  async deleteTag(id: string): Promise<void> {
    await this.databaseClient.db.delete(tag).where(eq(tag.id, id));
  }
}
