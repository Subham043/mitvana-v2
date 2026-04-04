import { mysqlTable, varchar, timestamp, primaryKey, int, double } from "drizzle-orm/mysql-core";
import { product } from "./product.schema";
import { order } from "./order.schema";
import { color } from "./color.schema";

export const order_product = mysqlTable("order_product", {
    order_id: varchar('order_id', { length: 255 }).notNull().references(() => order.id, {
        onDelete: 'cascade',
    }),
    product_id: varchar('product_id', { length: 255 }).notNull().references(() => product.id, {
        onDelete: 'no action',
    }),
    product_title: varchar("product_title", { length: 255 }).notNull(),
    product_slug: varchar("product_slug", { length: 255 }).notNull(),
    product_sku: varchar("product_sku", { length: 255 }).notNull(),
    product_hsn: varchar("product_hsn", { length: 255 }).notNull(),
    product_price: double("product_price", { precision: 10, scale: 2 }).notNull().default(0.00),
    product_discounted_price: double("product_discounted_price", { precision: 10, scale: 2 }).notNull().default(0.00),
    product_tax: double("product_tax", { precision: 10, scale: 2 }).notNull().default(0.00),
    product_image: varchar("product_image", { length: 255 }).notNull(),
    quantity: int("quantity").notNull().default(1),
    color_id: varchar('color_id', { length: 255 }).references(() => color.id, {
        onDelete: 'set null',
    }),
    color_name: varchar("color_name", { length: 255 }),
    color_code: varchar("color_code", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (table) => [
    primaryKey({ columns: [table.product_id, table.order_id] })
]);