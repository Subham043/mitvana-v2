import { Injectable } from '@nestjs/common';
import { TagRepositoryInterface } from '../interface/tag.repository.interface';
import { NewTagEntity, TagEntity, UpdateTagEntity } from '../entity/tag.entity';
import { DatabaseService } from 'src/database/database.service';
import { tag } from 'src/database/schema/tag.schema';
import { eq } from 'drizzle-orm';

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
  async getAll(): Promise<TagEntity[]> {
    return await this.databaseClient.db.select().from(tag);
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
