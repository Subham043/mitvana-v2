import { mysqlTable, int, varchar, timestamp, boolean } from "drizzle-orm/mysql-core";
import { v4 as uuidv4 } from 'uuid';
import { users } from "./users.schema";

export const reset_password = mysqlTable("reset_password", {
    token: varchar("token", { length: 255 }).primaryKey().$defaultFn(() => uuidv4()),
    user_id: varchar('user_id', { length: 255 }).notNull().unique().references(() => users.id, {
        onDelete: 'cascade',
    }),
    expires_at: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
