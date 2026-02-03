import { PaginationDto } from "src/utils/pagination/schema/pagination.schema";
import { CategoryEntity } from "../entity/category.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { CategoryCreateDto } from "../schema/category-create.schema";
import { CategoryUpdateDto } from "../schema/category-update.schema";

export interface CategoryServiceInterface {
    getByName(name: string): Promise<CategoryEntity>;
    getBySlug(slug: string): Promise<CategoryEntity>;
    getById(id: string): Promise<CategoryEntity>;
    getAll(query: PaginationDto): Promise<PaginationResponse<CategoryEntity>>;
    createCategory(category: CategoryCreateDto): Promise<CategoryEntity>;
    updateCategory(id: string, category: CategoryUpdateDto): Promise<CategoryEntity>;
    deleteCategory(id: string): Promise<void>;
}