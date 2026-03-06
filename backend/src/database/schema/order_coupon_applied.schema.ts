import { mysqlTable, varchar, timestamp, int } from "drizzle-orm/mysql-core";
import { order } from "./order.schema";
import { coupon_code } from "./coupon_code.schema";

export const order_coupon_applied = mysqlTable("order_coupon_applied", {
    order_id: varchar('order_id', { length: 255 }).primaryKey().references(() => order.id, {
        onDelete: 'cascade',
    }),
    coupon_code: varchar('coupon_code', { length: 255 }).notNull().references(() => coupon_code.code, {
        onDelete: 'no action',
    }),
    discount_percentage: int("discount_percentage").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});