import { mysqlTable, varchar, timestamp, primaryKey, int } from "drizzle-orm/mysql-core";
import { product } from "./product.schema";
import { cart } from "./cart.schema";
import { color } from "./color.schema";

export const cart_product = mysqlTable("cart_product", {
    product_id: varchar('product_id', { length: 255 }).notNull().references(() => product.id, {
        onDelete: 'cascade',
    }),
    cart_user_id: varchar('cart_user_id', { length: 255 }).notNull().references(() => cart.user_id, {
        onDelete: 'cascade',
    }),
    quantity: int("quantity").notNull().default(1),
    color_id: varchar('color_id', { length: 255 }).references(() => color.id, {
        onDelete: 'set null',
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (table) => [
    primaryKey({ columns: [table.product_id, table.cart_user_id] })
]);