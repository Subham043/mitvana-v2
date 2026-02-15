import { users } from "src/database/schema/users.schema";
import { sql } from 'drizzle-orm';

export type MainUserEntity = Omit<typeof users.$inferSelect, 'password' | 'verification_code'> & {
    is_verified: boolean;
}
export type NewMainUserEntity = typeof users.$inferInsert
export type UpdateMainUserEntity = Omit<MainUserEntity, 'id' | 'createdAt' | 'updatedAt' | 'is_admin' | 'verification_code' | 'email_verified_at' | 'is_verified'> & {
    password?: string;
}

export const UserSelect = {
    id: users.id,
    email: users.email,
    name: users.name,
    phone: users.phone,
    is_blocked: users.is_blocked,
    is_admin: users.is_admin,
    email_verified_at: users.email_verified_at,
    is_verified: sql<boolean>`(${users.email_verified_at} IS NOT NULL) = true`,
    createdAt: users.createdAt,
    updatedAt: users.updatedAt,
}