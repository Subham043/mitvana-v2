import { tag } from "src/database/schema/tag.schema";

export type TagEntity = typeof tag.$inferSelect
export type NewTagEntity = typeof tag.$inferInsert
export type UpdateTagEntity = Omit<TagEntity, 'id' | 'createdAt' | 'updatedAt'>