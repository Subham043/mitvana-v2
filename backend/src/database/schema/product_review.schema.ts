import { mysqlTable, varchar, timestamp, text, int, check, boolean } from "drizzle-orm/mysql-core";
import { v7 as uuidv7 } from 'uuid';
import { product } from "./product.schema";
import { users } from "./users.schema";
import { sql } from "drizzle-orm";

export const product_review = mysqlTable("product_review", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => uuidv7()),
    rating: int("rating").notNull().default(5),
    title: varchar("title", { length: 255 }),
    status: varchar("status", { length: 255 }).notNull().default("pending"),
    comment: text("comment"),
    user_id: varchar('user_id', { length: 255 }).notNull().references(() => users.id, {
        onDelete: 'cascade',
    }),
    product_id: varchar('product_id', { length: 255 }).notNull().references(() => product.id, {
        onDelete: 'cascade',
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
},
    (table) => [
        check("product_review_rating_check", sql`${table.rating} >= 1 AND ${table.rating} <= 5`),
        check("product_review_status_check", sql`${table.status} IN ('pending', 'approved', 'rejected')`)
    ]);