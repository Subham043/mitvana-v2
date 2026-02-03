import { users } from "src/database/schema";

export type AuthEntity = typeof users.$inferSelect
export type NewAuthEntity = typeof users.$inferInsert
export type UpdateAuthEntity = Omit<AuthEntity, 'id' | 'createdAt' | 'updatedAt' | 'email_verified_at' | 'is_blocked' | 'password'>