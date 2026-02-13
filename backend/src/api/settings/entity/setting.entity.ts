import { setting } from "src/database/schema";

export type SettingEntity = typeof setting.$inferSelect
export type NewSettingEntity = typeof setting.$inferInsert
export type UpdateSettingEntity = Omit<SettingEntity, 'id' | 'createdAt' | 'updatedAt'>