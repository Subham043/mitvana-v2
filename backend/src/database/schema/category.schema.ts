import { mysqlTable, varchar, timestamp, text, boolean } from "drizzle-orm/mysql-core";
import { v7 as uuidv7 } from 'uuid';

export const category = mysqlTable("category", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => uuidv7()),
    name: varchar("name", { length: 255 }).unique().notNull(),
    slug: varchar("slug", { length: 255 }).unique().notNull(),
    description: text("description"),
    thumbnail: text("thumbnail"),
    is_visible_in_navigation: boolean("is_visible_in_navigation").notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});