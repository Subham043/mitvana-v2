import { mysqlTable, varchar, timestamp, primaryKey } from "drizzle-orm/mysql-core";
import { product } from "./product.schema";
import { users } from "./users.schema";

export const wishlist = mysqlTable("wishlist", {
    product_id: varchar('product_id', { length: 255 }).notNull().references(() => product.id, {
        onDelete: 'cascade',
    }),
    user_id: varchar('user_id', { length: 255 }).notNull().references(() => users.id, {
        onDelete: 'cascade',
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (table) => [
    primaryKey({ columns: [table.product_id, table.user_id] })
]);