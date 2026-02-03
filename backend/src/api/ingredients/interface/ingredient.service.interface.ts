import { PaginationDto } from "src/utils/pagination/schema/pagination.schema";
import { IngredientEntity } from "../entity/ingredient.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { IngredientCreateDto } from "../schema/ingredient-create.schema";
import { IngredientUpdateDto } from "../schema/ingredient-update.schema";

export interface IngredientServiceInterface {
    getByTitle(title: string): Promise<IngredientEntity>;
    getById(id: string): Promise<IngredientEntity>;
    getAll(query: PaginationDto): Promise<PaginationResponse<IngredientEntity>>;
    createIngredient(ingredient: IngredientCreateDto): Promise<IngredientEntity>;
    updateIngredient(id: string, ingredient: IngredientUpdateDto): Promise<IngredientEntity>;
    deleteIngredient(id: string): Promise<void>;
}