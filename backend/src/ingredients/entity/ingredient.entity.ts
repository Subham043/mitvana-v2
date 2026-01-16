import { ingredient } from "src/database/schema";

export type IngredientEntity = typeof ingredient.$inferSelect
export type NewIngredientEntity = typeof ingredient.$inferInsert
export type UpdateIngredientEntity = Omit<IngredientEntity, 'id' | 'createdAt' | 'updatedAt' | 'thumbnail'> & { thumbnail?: string }