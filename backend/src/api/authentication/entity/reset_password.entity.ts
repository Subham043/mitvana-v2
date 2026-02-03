import { reset_password } from "src/database/schema";

export type ResetPasswordEntity = typeof reset_password.$inferSelect
export type NewResetPasswordEntity = typeof reset_password.$inferInsert
export type UpdateResetPasswordEntity = Omit<ResetPasswordEntity, 'user_id' | 'createdAt' | 'updatedAt'>