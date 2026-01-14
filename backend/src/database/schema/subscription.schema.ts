import { mysqlTable, varchar, timestamp } from "drizzle-orm/mysql-core";

export const subscription = mysqlTable("subscription", {
    email: varchar("email", { length: 255 }).primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});