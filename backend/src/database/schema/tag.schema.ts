import { mysqlTable, varchar, timestamp } from "drizzle-orm/mysql-core";
import { v4 as uuidv4 } from 'uuid';

export const tag = mysqlTable("tag", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => uuidv4()),
    name: varchar("name", { length: 255 }).unique().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().onUpdateNow().notNull(),
});