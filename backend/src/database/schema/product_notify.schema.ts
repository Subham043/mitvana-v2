import { mysqlTable, varchar, timestamp, text } from "drizzle-orm/mysql-core";
import { v4 as uuidv4 } from 'uuid';
import { product } from "./product.schema";

export const product_notify = mysqlTable("product_notify", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => uuidv4()),
    email: varchar("email", { length: 255 }).unique().notNull(),
    product_id: varchar('product_id', { length: 255 }).notNull().references(() => product.id, {
        onDelete: 'cascade',
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});