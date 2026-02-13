import { color } from "src/database/schema";

export type ColorEntity = typeof color.$inferSelect
export type NewColorEntity = typeof color.$inferInsert
export type UpdateColorEntity = Omit<ColorEntity, 'id' | 'createdAt' | 'updatedAt'>