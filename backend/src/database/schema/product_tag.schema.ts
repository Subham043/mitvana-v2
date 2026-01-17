import { mysqlTable, varchar, timestamp, primaryKey } from "drizzle-orm/mysql-core";
import { product } from "./product.schema";
import { tag } from "./tag.schema";

export const product_tag = mysqlTable("product_tag", {
    product_id: varchar('product_id', { length: 255 }).notNull().references(() => product.id, {
        onDelete: 'cascade',
    }),
    tag_id: varchar('tag_id', { length: 255 }).notNull().references(() => tag.id, {
        onDelete: 'cascade',
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (table) => [
    primaryKey({ columns: [table.product_id, table.tag_id] })
]);