import { users } from "src/database/schema";

export type UserEntity = typeof users.$inferSelect
export type NewUserEntity = typeof users.$inferInsert
export type UpdateUserEntity = Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt' | 'email_verified_at' | 'is_blocked' | 'password'>