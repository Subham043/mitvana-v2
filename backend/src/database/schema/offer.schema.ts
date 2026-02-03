import { mysqlTable, varchar, timestamp, text, int } from "drizzle-orm/mysql-core";
import { v7 as uuidv7 } from 'uuid';

export const offer = mysqlTable("offer", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => uuidv7()),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    discount_percentage: int("discount_percentage").notNull(),
    min_cart_value: int("min_cart_value"),
    max_discount: int("max_discount"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});