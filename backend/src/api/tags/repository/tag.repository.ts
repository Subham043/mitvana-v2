import { Injectable } from '@nestjs/common';
import { TagRepositoryInterface } from '../interface/tag.repository.interface';
import { NewTagEntity, TagEntity, UpdateTagEntity } from '../entity/tag.entity';
import { DatabaseService } from 'src/database/database.service';
import { tag } from 'src/database/schema';
import { desc, count, eq, like, inArray, SQL, and } from 'drizzle-orm';
import { PaginationQuery } from 'src/utils/pagination/normalize.pagination';

@Injectable()
export class ITagRepository implements TagRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService
  ) { }
  async getByName(name: string): Promise<TagEntity | null> {
    const result = await this.databaseClient.db.select().from(tag).where(eq(tag.name, name)).limit(1);
    if (!result.length) return null;
    return result[0];
  }
  async getById(id: string): Promise<TagEntity | null> {
    const result = await this.databaseClient.db.select().from(tag).where(eq(tag.id, id)).limit(1);
    if (!result.length) return null;
    return result[0];
  }

  private async filters(search: string = ""): Promise<SQL<unknown> | undefined> {
    const filters: SQL[] = [];
    if (search.length > 0) {
      filters.push(like(tag.name, `%${search}%`));
    }
    return filters.length > 0 ? and(...filters) : undefined;
  }

  async getAll(query: PaginationQuery): Promise<TagEntity[]> {
    const { limit, offset, search } = query;
    const filters = await this.filters(search);
    const result = await this.databaseClient.db.select().from(tag).where(filters).orderBy(desc(tag.createdAt)).limit(limit).offset(offset);
    return result;
  }

  async count(search?: string): Promise<number> {
    const filters = await this.filters(search);
    const result = await this.databaseClient.db.select({ count: count(tag.id) }).from(tag).where(filters);
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
  async checkIdsExists(ids: string[]): Promise<{ id: string; exists: boolean }[]> {
    const result = await this.databaseClient.db.select({ id: tag.id }).from(tag).where(inArray(tag.id, ids));
    return ids.map((id) => ({ id, exists: result.some((item) => item.id === id) }));
  }
}
