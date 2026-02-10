import { Injectable } from '@nestjs/common';
import { IngredientRepositoryInterface } from '../interface/ingredient.repository.interface';
import { NewIngredientEntity, IngredientEntity, UpdateIngredientEntity, IngredientSelect } from '../entity/ingredient.entity';
import { DatabaseService } from 'src/database/database.service';
import { ingredient } from 'src/database/schema/ingredient.schema';
import { desc, count, eq, like } from 'drizzle-orm';
import { PaginationQuery } from 'src/utils/pagination/normalize.pagination';
import { CustomQueryCacheConfig } from "src/utils/types";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IngredientRepository implements IngredientRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService,
    private readonly configService: ConfigService
  ) { }
  getIngredientWithImageSelect() {
    return IngredientSelect(`${this.configService.get<string>('APP_URL')}/uploads/`)
  }
  async getByTitle(title: string, cacheConfig: CustomQueryCacheConfig = false): Promise<IngredientEntity | null> {
    const result = await this.databaseClient.db.select(this.getIngredientWithImageSelect()).from(ingredient).where(eq(ingredient.title, title)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    return result[0];
  }
  async getById(id: string, cacheConfig: CustomQueryCacheConfig = false): Promise<IngredientEntity | null> {
    const result = await this.databaseClient.db.select(this.getIngredientWithImageSelect()).from(ingredient).where(eq(ingredient.id, id)).limit(1).$withCache(cacheConfig);
    if (!result.length) return null;
    return result[0];
  }
  async getAll(query: PaginationQuery, cacheConfig: CustomQueryCacheConfig = false): Promise<IngredientEntity[]> {
    const { limit, offset, search } = query;
    const result = await this.databaseClient.db.select(this.getIngredientWithImageSelect()).from(ingredient).where(search ? like(ingredient.title, `%${search}%`) : undefined).orderBy(desc(ingredient.createdAt)).limit(limit).offset(offset).$withCache(cacheConfig);
    return result;
  }

  async count(search?: string, cacheConfig: CustomQueryCacheConfig = false): Promise<number> {
    const result = await this.databaseClient.db.select({ count: count(ingredient.id) }).from(ingredient).where(search ? like(ingredient.title, `%${search}%`) : undefined).$withCache(cacheConfig);
    return result[0].count;
  }
  async createIngredient(data: NewIngredientEntity): Promise<IngredientEntity | null> {
    const result = await this.databaseClient.db.insert(ingredient).values(data).$returningId();
    return await this.getById(result[0].id);
  }
  async updateIngredient(id: string, data: UpdateIngredientEntity): Promise<IngredientEntity | null> {
    await this.databaseClient.db.update(ingredient).set(data).where(eq(ingredient.id, id));
    return await this.getById(id);
  }
  async deleteIngredient(id: string): Promise<void> {
    await this.databaseClient.db.delete(ingredient).where(eq(ingredient.id, id));
  }
}
