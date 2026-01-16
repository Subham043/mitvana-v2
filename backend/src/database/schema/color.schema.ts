import { mysqlTable, varchar, timestamp } from "drizzle-orm/mysql-core";
import { v4 as uuidv4 } from 'uuid';

export const color = mysqlTable("color", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => uuidv4()),
    name: varchar("name", { length: 255 }).notNull(),
    code: varchar("code", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});