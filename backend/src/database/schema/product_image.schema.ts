import { mysqlTable, varchar, timestamp, text } from "drizzle-orm/mysql-core";
import { v7 as uuidv7 } from 'uuid';
import { product } from "./product.schema";

export const product_image = mysqlTable("product_image", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => uuidv7()),
    image: text("image"),
    product_id: varchar('product_id', { length: 255 }).notNull().references(() => product.id, {
        onDelete: 'cascade',
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});