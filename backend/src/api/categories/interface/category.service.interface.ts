import { CategoryEntity } from "../entity/category.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { CategoryCreateDto } from "../schema/category-create.schema";
import { CategoryUpdateDto } from "../schema/category-update.schema";
import { CategoryUpdateStatusDto } from "../schema/category-update-status.schema";
import { PassThrough } from "stream";
import { CategoryFilterDto } from "../schema/category-filter.schema";

export interface CategoryServiceInterface {
    getByName(name: string): Promise<CategoryEntity>;
    getBySlug(slug: string): Promise<CategoryEntity>;
    getById(id: string): Promise<CategoryEntity>;
    getAll(query: CategoryFilterDto): Promise<PaginationResponse<CategoryEntity, Omit<CategoryFilterDto, 'page' | 'limit' | 'offset' | 'search'>>>;
    createCategory(category: CategoryCreateDto): Promise<CategoryEntity>;
    updateCategory(id: string, category: CategoryUpdateDto): Promise<CategoryEntity>;
    updateCategoryStatus(id: string, category: CategoryUpdateStatusDto): Promise<CategoryEntity>;
    deleteCategory(id: string): Promise<void>;
    exportCategories(query: CategoryFilterDto): Promise<PassThrough>;
}