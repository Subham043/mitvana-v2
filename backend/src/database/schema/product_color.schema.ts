import { mysqlTable, varchar, timestamp, primaryKey } from "drizzle-orm/mysql-core";
import { product } from "./product.schema";
import { color } from "./color.schema";

export const product_color = mysqlTable("product_color", {
    product_id: varchar('product_id', { length: 255 }).notNull().references(() => product.id, {
        onDelete: 'cascade',
    }),
    color_id: varchar('color_id', { length: 255 }).notNull().references(() => color.id, {
        onDelete: 'cascade',
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (table) => [
    primaryKey({ columns: [table.product_id, table.color_id] })
]);