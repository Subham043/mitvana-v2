import { mysqlTable, varchar, timestamp, boolean } from "drizzle-orm/mysql-core";
import { v7 as uuidv7 } from 'uuid';

export const users = mysqlTable("users", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => uuidv7()),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    phone: varchar("phone", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    is_blocked: boolean("is_blocked").notNull().default(false),
    is_admin: boolean("is_admin").notNull().default(false),
    email_verified_at: timestamp("email_verified_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
