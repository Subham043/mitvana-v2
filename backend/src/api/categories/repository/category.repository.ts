import { Injectable } from '@nestjs/common';
import { CategoryRepositoryInterface } from '../interface/category.repository.interface';
import { NewCategoryEntity, CategoryEntity, UpdateCategoryEntity, CategorySelect } from '../entity/category.entity';
import { DatabaseService } from 'src/database/database.service';
import { category } from 'src/database/schema';
import { desc, count, eq, like, inArray, SQL, or, and } from 'drizzle-orm';
import { CountQuery, PaginationQuery } from 'src/utils/pagination/normalize.pagination';
import { CustomQueryCacheConfig } from "src/utils/types";
import { ConfigService } from '@nestjs/config';
import { CategoryFilterDto } from '../schema/category-filter.schema';
import { AppConfigType } from 'src/config/schema';

@Injectable()
export class CategoryRepository implements CategoryRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService,
    private readonly configService: ConfigService<AppConfigType>
  ) { }
  getCategoryWithImageSelect() {
    return CategorySelect(`${this.configService.get('APP_URL')}/uploads/`)
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

  private async filters(search: string = "", is_visible_in_navigation?: boolean): Promise<SQL<unknown> | undefined> {
    const searchFilters: SQL[] = [];
    const filters: SQL[] = [];
    if (search.length > 0) {
      searchFilters.push(like(category.name, `%${search}%`));
      searchFilters.push(like(category.slug, `%${search}%`));
      searchFilters.push(like(category.description, `%${search}%`));
    }
    if (is_visible_in_navigation !== undefined) {
      filters.push(eq(category.is_visible_in_navigation, is_visible_in_navigation));
    }
    //or for searchFilters and and for filters
    const searchCondition = searchFilters.length > 0 ? or(...searchFilters) : undefined;
    const filterCondition = filters.length > 0 ? and(...filters) : undefined;
    return searchCondition && filterCondition ? and(searchCondition, filterCondition) : searchCondition || filterCondition;
  }

  async getAll(query: PaginationQuery<CategoryFilterDto>, cacheConfig: CustomQueryCacheConfig = false): Promise<CategoryEntity[]> {
    const { limit, offset, search, is_visible_in_navigation } = query;
    const filters = await this.filters(search, is_visible_in_navigation);
    const result = await this.databaseClient.db.select(this.getCategoryWithImageSelect()).from(category).where(filters).orderBy(desc(category.createdAt)).limit(limit).offset(offset).$withCache(cacheConfig);
    return result;
  }

  async count(query: CountQuery<CategoryFilterDto>, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const { search, is_visible_in_navigation } = query;
    const filters = await this.filters(search, is_visible_in_navigation);
    const result = await this.databaseClient.db.select({ count: count(category.id) }).from(category).where(filters).$withCache(cacheConfig);
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
  async checkIdsExists(ids: string[], cacheConfig: CustomQueryCacheConfig = false): Promise<{ id: string; exists: boolean }[]> {
    const result = await this.databaseClient.db.select({ id: category.id }).from(category).where(inArray(category.id, ids)).$withCache(cacheConfig);
    return ids.map((id) => ({ id, exists: result.some((item) => item.id === id) }));
  }
}
