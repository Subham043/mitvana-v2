import { relations } from 'drizzle-orm';
import { users } from './users.schema';
import { reset_password } from './reset_password.schema';
import { address } from './address.schema';

export const usersRelations = relations(users, ({ one, many }) => ({
    reset_password: one(reset_password, {
        fields: [users.id],
        references: [reset_password.user_id],
    }),
    address: many(address),
}));

export const resetPasswordRelations = relations(reset_password, ({ one }) => ({
    user: one(users, {
        fields: [reset_password.user_id],
        references: [users.id],
    }),
}));

export const addressRelations = relations(address, ({ one }) => ({
    user: one(users, {
        fields: [address.user_id],
        references: [users.id],
    }),
}));
