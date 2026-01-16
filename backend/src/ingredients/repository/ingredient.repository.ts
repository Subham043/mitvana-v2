import { Injectable } from '@nestjs/common';
import { IngredientRepositoryInterface } from '../interface/ingredient.repository.interface';
import { NewIngredientEntity, IngredientEntity, UpdateIngredientEntity } from '../entity/ingredient.entity';
import { DatabaseService } from 'src/database/database.service';
import { ingredient } from 'src/database/schema/ingredient.schema';
import { asc, count, eq, like } from 'drizzle-orm';
import { PaginationQuery } from 'src/utils/pagination/normalize.pagination';

@Injectable()
export class IngredientRepository implements IngredientRepositoryInterface {
  constructor(
    private readonly databaseClient: DatabaseService
  ) { }
  async getByTitle(title: string): Promise<IngredientEntity | null> {
    const result = await this.databaseClient.db.select().from(ingredient).where(eq(ingredient.title, title)).limit(1);
    if (!result.length) return null;
    return result[0];
  }
  async getById(id: string): Promise<IngredientEntity | null> {
    const result = await this.databaseClient.db.select().from(ingredient).where(eq(ingredient.id, id)).limit(1);
    if (!result.length) return null;
    return result[0];
  }
  async getAll(query: PaginationQuery): Promise<IngredientEntity[]> {
    const { limit, offset, search } = query;
    const result = await this.databaseClient.db.select().from(ingredient).where(search ? like(ingredient.title, `%${search}%`) : undefined).orderBy(asc(ingredient.id)).limit(limit).offset(offset);
    return result;
  }

  async count(search?: string): Promise<number> {
    const result = await this.databaseClient.db.select({ count: count(ingredient.id) }).from(ingredient).where(search ? like(ingredient.title, `%${search}%`) : undefined);
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
