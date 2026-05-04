import { mysqlTable, varchar, timestamp, int } from "drizzle-orm/mysql-core";

export const order_invoice = mysqlTable("order_invoice", {
    financial_year: varchar("financial_year", { length: 255 }).primaryKey().notNull(),
    current_value: int('current_value').notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});