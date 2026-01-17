import { mysqlTable, varchar, timestamp, primaryKey } from "drizzle-orm/mysql-core";
import { product } from "./product.schema";
import { offer } from "./offer.schema";

export const offer_product = mysqlTable("offer_product", {
    product_id: varchar('product_id', { length: 255 }).notNull().references(() => product.id, {
        onDelete: 'cascade',
    }),
    offer_id: varchar('offer_id', { length: 255 }).notNull().references(() => offer.id, {
        onDelete: 'cascade',
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (table) => [
    primaryKey({ columns: [table.product_id, table.offer_id] })
]);