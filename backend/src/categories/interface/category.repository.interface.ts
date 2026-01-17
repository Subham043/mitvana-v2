import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewCategoryEntity, UpdateCategoryEntity, CategoryEntity } from "../entity/category.entity";
import { CustomQueryCacheConfig } from "src/utils/types";

export interface CategoryRepositoryInterface {
    getByName(name: string, cacheConfig?: CustomQueryCacheConfig): Promise<CategoryEntity | null>;
    getBySlug(slug: string, cacheConfig?: CustomQueryCacheConfig): Promise<CategoryEntity | null>;
    getById(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<CategoryEntity | null>;
    getAll(query: PaginationQuery, cacheConfig?: CustomQueryCacheConfig): Promise<CategoryEntity[]>;
    count(search?: string, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    createCategory(category: NewCategoryEntity): Promise<CategoryEntity | null>;
    updateCategory(id: string, category: UpdateCategoryEntity): Promise<CategoryEntity | null>;
    deleteCategory(id: string): Promise<void>;
}