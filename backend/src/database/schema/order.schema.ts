import { mysqlTable, varchar, timestamp, text, check, double, boolean } from "drizzle-orm/mysql-core";
import { users } from "./users.schema";
import { sql } from "drizzle-orm";

// generate custom unique order id
function generateOrderId() {
    const random = crypto.randomUUID().slice(0, 8);
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return `ORD-${date}-${random}`;
}

export const order = mysqlTable("order", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => generateOrderId()), // generate custom unique order id
    user_id: varchar('user_id', { length: 255 }).notNull().references(() => users.id, {
        onDelete: 'cascade',
    }),
    status: varchar("status", { length: 255 }).notNull().default("Order Placed"),
    shipping_charges: double("shipping_charges", { precision: 10, scale: 2 }).notNull().default(0.00),
    cgst: double("cgst", { precision: 10, scale: 2 }).notNull().default(0.00),
    sgst: double("sgst", { precision: 10, scale: 2 }).notNull().default(0.00),
    total_price: double("total_price", { precision: 10, scale: 2 }).notNull().default(0.00),
    discounted_price: double("discounted_price", { precision: 10, scale: 2 }).notNull(),
    cancellation_reason: text("cancellation_reason"),
    payment_method: varchar("payment_method", { length: 255 }).notNull().default("Razorpay"),
    is_paid: boolean("is_paid").notNull().default(false),
    paid_at: timestamp("paid_at"),
    is_delivered: boolean("is_delivered").notNull().default(false),
    delivered_at: timestamp("delivered_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
},
    (table) => [
        check("status_check", sql`${table.status} IN ('Order Placed', 'Order Created', 'Payment Failed', 'On Hold', 'Processing', 'Dispatched', 'In Transit', 'Out for Delivery', 'Delivered', 'Cancelled by Admin', 'Refunded', 'Failed')`),
        check("payment_method_check", sql`${table.payment_method} IN ('Razorpay', 'Cash on Delivery')`)
    ]);