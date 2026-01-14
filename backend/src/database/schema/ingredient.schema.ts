import { mysqlTable, varchar, timestamp, text, boolean } from "drizzle-orm/mysql-core";
import { v4 as uuidv4 } from 'uuid';

export const ingredient = mysqlTable("ingredient", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => uuidv4()),
    title: varchar("title", { length: 255 }).unique().notNull(),
    description: text("description").notNull(),
    thumbnail: text("thumbnail").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});