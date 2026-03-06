import { mysqlTable, varchar, timestamp, boolean } from "drizzle-orm/mysql-core";
import { users } from "./users.schema";

export const cart = mysqlTable("cart", {
    user_id: varchar('user_id', { length: 255 }).primaryKey().references(() => users.id, {
        onDelete: 'cascade',
    }),
    is_mail_sent: boolean("is_mail_sent").notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});