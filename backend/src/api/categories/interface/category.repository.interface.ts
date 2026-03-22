import { CountQuery, PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewCategoryEntity, UpdateCategoryEntity, CategoryEntity } from "../entity/category.entity";
import { CustomQueryCacheConfig } from "src/utils/types";
import { CategoryFilterDto } from "../schema/category-filter.schema";

export interface CategoryRepositoryInterface {
    getByName(name: string, cacheConfig?: CustomQueryCacheConfig): Promise<CategoryEntity | null>;
    getBySlug(slug: string, cacheConfig?: CustomQueryCacheConfig): Promise<CategoryEntity | null>;
    getById(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<CategoryEntity | null>;
    getAll(query: PaginationQuery<CategoryFilterDto>, cacheConfig?: CustomQueryCacheConfig): Promise<CategoryEntity[]>;
    count(query: CountQuery<CategoryFilterDto>, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    createCategory(category: NewCategoryEntity): Promise<CategoryEntity | null>;
    updateCategory(id: string, category: UpdateCategoryEntity): Promise<CategoryEntity | null>;
    deleteCategory(id: string): Promise<void>;
    checkIdsExists(ids: string[], cacheConfig?: CustomQueryCacheConfig): Promise<{ id: string; exists: boolean }[]>;
}