import { mysqlTable, varchar, timestamp } from "drizzle-orm/mysql-core";

export const tag = mysqlTable("tag", {
    name: varchar("name", { length: 255 }).primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});