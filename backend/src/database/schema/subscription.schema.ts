import { mysqlTable, varchar, timestamp } from "drizzle-orm/mysql-core";
import { v4 as uuidv4 } from 'uuid';

export const subscription = mysqlTable("subscription", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => uuidv4()),
    email: varchar("email", { length: 255 }).unique().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});