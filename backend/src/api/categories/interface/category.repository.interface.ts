import { CountQuery, PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewCategoryEntity, UpdateCategoryEntity, CategoryEntity } from "../entity/category.entity";
import { CategoryFilterDto } from "../schema/category-filter.schema";

export interface CategoryRepositoryInterface {
    getByName(name: string): Promise<CategoryEntity | null>;
    getBySlug(slug: string): Promise<CategoryEntity | null>;
    getById(id: string): Promise<CategoryEntity | null>;
    getAll(query: PaginationQuery<CategoryFilterDto>): Promise<CategoryEntity[]>;
    count(query: CountQuery<CategoryFilterDto>): Promise<number>
    createCategory(category: NewCategoryEntity): Promise<CategoryEntity | null>;
    updateCategory(id: string, category: UpdateCategoryEntity): Promise<CategoryEntity | null>;
    deleteCategory(id: string): Promise<void>;
    checkIdsExists(ids: string[]): Promise<{ id: string; exists: boolean }[]>;
}