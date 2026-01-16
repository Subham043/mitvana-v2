import { Injectable } from '@nestjs/common';
import { CategoryRepositoryInterface } from '../interface/category.repository.interface';
import { NewCategoryEntity, CategoryEntity, UpdateCategoryEntity } from '../entity/category.entity';
import { DatabaseService } from 'src/database/database.service';
import { category } from 'src/database/schema/category.schema';
import { asc, count, eq, like } from 'drizzle-orm';
import { PaginationQuery } from 'src/utils/pagination/normalize.pagination';

@Injectable()
export class CategoryRepository implements CategoryRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService
  ) { }
  async getByName(name: string): Promise<CategoryEntity | null> {
    const result = await this.databaseClient.db.select().from(category).where(eq(category.name, name)).limit(1);
    if (!result.length) return null;
    return result[0];
  }
  async getBySlug(slug: string): Promise<CategoryEntity | null> {
    const result = await this.databaseClient.db.select().from(category).where(eq(category.slug, slug)).limit(1);
    if (!result.length) return null;
    return result[0];
  }
  async getById(id: string): Promise<CategoryEntity | null> {
    const result = await this.databaseClient.db.select().from(category).where(eq(category.id, id)).limit(1);
    if (!result.length) return null;
    return result[0];
  }
  async getAll(query: PaginationQuery): Promise<CategoryEntity[]> {
    const { limit, offset, search } = query;
    const result = await this.databaseClient.db.select().from(category).where(search ? like(category.name, `%${search}%`) : undefined).orderBy(asc(category.id)).limit(limit).offset(offset);
    return result;
  }

  async count(search?: string): Promise<number> {
    const result = await this.databaseClient.db.select({ count: count(category.id) }).from(category).where(search ? like(category.name, `%${search}%`) : undefined);
    return result[0].count;
  }
  async createCategory(data: NewCategoryEntity): Promise<CategoryEntity | null> {
    const result = await this.databaseClient.db.insert(category).values(data).$returningId();
    return await this.getById(result[0].id);
  }
  async updateCategory(id: string, data: UpdateCategoryEntity): Promise<CategoryEntity | null> {
    await this.databaseClient.db.update(category).set(data).where(eq(category.id, id));
    return await this.getById(id);
  }
  async deleteCategory(id: string): Promise<void> {
    await this.databaseClient.db.delete(category).where(eq(category.id, id));
  }
}
