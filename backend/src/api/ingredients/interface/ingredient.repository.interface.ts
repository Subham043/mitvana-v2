import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewIngredientEntity, UpdateIngredientEntity, IngredientEntity } from "../entity/ingredient.entity";
import { CustomQueryCacheConfig } from "src/utils/types";

export interface IngredientRepositoryInterface {
    getByTitle(title: string, cacheConfig?: CustomQueryCacheConfig): Promise<IngredientEntity | null>;
    getById(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<IngredientEntity | null>;
    getAll(query: PaginationQuery, cacheConfig?: CustomQueryCacheConfig): Promise<IngredientEntity[]>;
    count(search?: string, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    createIngredient(ingredient: NewIngredientEntity): Promise<IngredientEntity | null>;
    updateIngredient(id: string, ingredient: UpdateIngredientEntity): Promise<IngredientEntity | null>;
    deleteIngredient(id: string): Promise<void>;
    checkIdsExists(ids: string[], cacheConfig?: CustomQueryCacheConfig): Promise<{ id: string; exists: boolean }[]>;
}