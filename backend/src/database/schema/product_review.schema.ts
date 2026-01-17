import { mysqlTable, varchar, timestamp, text, int, check, boolean } from "drizzle-orm/mysql-core";
import { v4 as uuidv4 } from 'uuid';
import { product } from "./product.schema";
import { users } from "./users.schema";
import { sql } from "drizzle-orm";

export const product_review = mysqlTable("product_review", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => uuidv4()),
    rating: int("rating").notNull().default(5),
    title: varchar("title", { length: 255 }),
    status: varchar("status", { length: 255 }).notNull().default("pending"),
    comment: text("comment"),
    image: text("image"),
    user_id: varchar('user_id', { length: 255 }).notNull().references(() => users.id, {
        onDelete: 'cascade',
    }),
    product_id: varchar('product_id', { length: 255 }).notNull().references(() => product.id, {
        onDelete: 'cascade',
    }),
    is_approved: boolean("is_approved").notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
},
    (table) => [
        check("rating_check", sql`${table.rating} >= 1 AND ${table.rating} <= 5`)
    ]);