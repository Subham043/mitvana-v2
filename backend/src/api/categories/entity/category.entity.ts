import { category } from "src/database/schema";

export type CategoryEntity = typeof category.$inferSelect
export type NewCategoryEntity = typeof category.$inferInsert
export type UpdateCategoryEntity = Omit<CategoryEntity, 'id' | 'createdAt' | 'updatedAt' | 'thumbnail'> & { thumbnail?: string }