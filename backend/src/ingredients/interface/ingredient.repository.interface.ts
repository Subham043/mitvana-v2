import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewIngredientEntity, UpdateIngredientEntity, IngredientEntity } from "../entity/ingredient.entity";

export interface IngredientRepositoryInterface {
    getByTitle(title: string): Promise<IngredientEntity | null>;
    getById(id: string): Promise<IngredientEntity | null>;
    getAll(query: PaginationQuery): Promise<IngredientEntity[]>;
    count(search?: string): Promise<number>
    createIngredient(ingredient: NewIngredientEntity): Promise<IngredientEntity | null>;
    updateIngredient(id: string, ingredient: UpdateIngredientEntity): Promise<IngredientEntity | null>;
    deleteIngredient(id: string): Promise<void>;
}