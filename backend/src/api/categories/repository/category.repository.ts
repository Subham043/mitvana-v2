import { Injectable } from '@nestjs/common';
import { CategoryRepositoryInterface } from '../interface/category.repository.interface';
import { NewCategoryEntity, CategoryEntity, UpdateCategoryEntity, CategorySelect } from '../entity/category.entity';
import { DatabaseService } from 'src/database/database.service';
import { category } from 'src/database/schema/category.schema';
import { desc, count, eq, like } from 'drizzle-orm';
import { PaginationQuery } from 'src/utils/pagination/normalize.pagination';
import { CustomQueryCacheConfig } from "src/utils/types";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CategoryRepository implements CategoryRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService,
    private readonly configService: ConfigService
  ) { }
  getCategoryWithImageSelect() {
    return CategorySelect(`${this.configService.get<string>('APP_URL')}/uploads/`)
  }
  async getByName(name: string, cacheConfig: CustomQueryCacheConfig = false): Promise<CategoryEntity | null> {
    const result = await this.databaseClient.db.select(this.getCategoryWithImageSelect()).from(category).where(eq(category.name, name)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    return result[0];
  }
  async getBySlug(slug: string, cacheConfig: CustomQueryCacheConfig = false): Promise<CategoryEntity | null> {
    const result = await this.databaseClient.db.select(this.getCategoryWithImageSelect()).from(category).where(eq(category.slug, slug)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    return result[0];
  }
  async getById(id: string, cacheConfig: CustomQueryCacheConfig = false): Promise<CategoryEntity | null> {
    const result = await this.databaseClient.db.select(this.getCategoryWithImageSelect()).from(category).where(eq(category.id, id)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    return result[0];
  }
  async getAll(query: PaginationQuery, cacheConfig: CustomQueryCacheConfig = false): Promise<CategoryEntity[]> {
    const { limit, offset, search } = query;
    const result = await this.databaseClient.db.select(this.getCategoryWithImageSelect()).from(category).where(search ? like(category.name, `%${search}%`) : undefined).orderBy(desc(category.createdAt)).limit(limit).offset(offset).$withCache(cacheConfig);
    return result;
  }

  async count(search?: string, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const result = await this.databaseClient.db.select({ count: count(category.id) }).from(category).where(search ? like(category.name, `%${search}%`) : undefined).$withCache(cacheConfig);
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
