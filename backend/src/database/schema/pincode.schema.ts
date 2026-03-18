import { sql } from "drizzle-orm";
import { mysqlTable, varchar, timestamp, int, check, double, boolean } from "drizzle-orm/mysql-core";
import { v7 as uuidv7 } from 'uuid';

export const pincode = mysqlTable("pincode", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => uuidv7()),
    pincode: int("pincode").unique().notNull(),
    shipping_charges: double("shipping_charges", { precision: 10, scale: 2 }).notNull().default(0.00),
    is_igst_applicable: boolean("is_igst_applicable").notNull().default(true),
    is_delivery_available: boolean("is_delivery_available").notNull().default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (table) => [
    check("pincode_check", sql`${table.pincode} >= 100000 AND ${table.pincode} <= 999999`)
]);