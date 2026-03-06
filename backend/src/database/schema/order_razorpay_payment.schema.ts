import { mysqlTable, varchar, timestamp, text, check } from "drizzle-orm/mysql-core";
import { order } from "./order.schema";
import { sql } from "drizzle-orm";

export const order_razorpay_payment = mysqlTable("order_razorpay_payment", {
    order_id: varchar('order_id', { length: 255 }).primaryKey().references(() => order.id, {
        onDelete: 'cascade',
    }),
    payment_data: text("payment_data"),
    razorpay_order_id: varchar("razorpay_order_id", { length: 255 }),
    razorpay_payment_id: varchar("razorpay_payment_id", { length: 255 }),
    razorpay_payment_signature: varchar("razorpay_payment_signature", { length: 255 }),
    status: varchar("status", { length: 255 }).notNull().default("pending"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
},
    (table) => [
        check("order_razorpay_payment_status_check", sql`${table.status} IN ('pending', 'paid', 'failed', 'cancelled')`)
    ]);