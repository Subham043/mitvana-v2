import { sql } from "drizzle-orm";
import { mysqlTable, varchar, timestamp, int, check } from "drizzle-orm/mysql-core";
import { v7 as uuidv7 } from 'uuid';

export const pincode = mysqlTable("pincode", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => uuidv7()),
    pincode: int("pincode").unique().notNull(),
    tat: int("tat"),
    service: varchar("service", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (table) => [
    check("pincode_check", sql`${table.pincode} >= 100000 AND ${table.pincode} <= 999999`)
]);