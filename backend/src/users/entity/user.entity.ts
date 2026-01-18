import { users } from "src/database/schema";

export type MainUserEntity = Omit<typeof users.$inferSelect, 'password' | 'verification_code'> & {
    is_verified: boolean;
}
export type NewMainUserEntity = typeof users.$inferInsert
export type UpdateMainUserEntity = Omit<MainUserEntity, 'id' | 'createdAt' | 'updatedAt' | 'is_admin' | 'verification_code' | 'email_verified_at' | 'is_verified'> & {
    password?: string;
}