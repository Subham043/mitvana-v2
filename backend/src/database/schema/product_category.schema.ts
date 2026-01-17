import { mysqlTable, varchar, timestamp, primaryKey } from "drizzle-orm/mysql-core";
import { product } from "./product.schema";
import { category } from "./category.schema";

export const product_category = mysqlTable("product_category", {
    product_id: varchar('product_id', { length: 255 }).notNull().references(() => product.id, {
        onDelete: 'cascade',
    }),
    category_id: varchar('category_id', { length: 255 }).notNull().references(() => category.id, {
        onDelete: 'cascade',
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (table) => [
    primaryKey({ columns: [table.product_id, table.category_id] })
]);