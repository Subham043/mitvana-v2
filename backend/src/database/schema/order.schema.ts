import { mysqlTable, varchar, timestamp, text, check, double, boolean, index } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { v7 as uuidv7 } from 'uuid';

// generate custom unique order id
function generateOrderId() {
    const random = crypto.randomUUID().slice(0, 8);
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return `ORD-${date}-${random}`;
}

export const order = mysqlTable("order", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => uuidv7()), // generate custom unique order id
    orderId: varchar("orderId", { length: 255 }).notNull().$defaultFn(() => generateOrderId()), // generate custom unique order id
    user_id: varchar('user_id', { length: 255 }).notNull(),
    status: varchar("status", { length: 255 }).notNull().default("Order Created"),
    invoice_no: varchar('invoice_no', { length: 255 }),
    shipping_charges: double("shipping_charges", { precision: 10, scale: 2 }).notNull().default(0.00),
    is_igst_applicable: boolean("is_igst_applicable").notNull().default(true),
    total_price: double("total_price", { precision: 10, scale: 2 }).notNull().default(0.00),
    sub_total_discounted_price: double("sub_total_discounted_price", { precision: 10, scale: 2 }).notNull(),
    sub_total: double("sub_total", { precision: 10, scale: 2 }).notNull(),
    discount: double("discount", { precision: 10, scale: 2 }).notNull().default(0.00),
    cancellation_reason: text("cancellation_reason"),
    payment_method: varchar("payment_method", { length: 255 }).notNull().default("Razorpay"),
    order_note: text("order_note"),
    is_paid: boolean("is_paid").notNull().default(false),
    paid_at: timestamp("paid_at"),
    is_delivered: boolean("is_delivered").notNull().default(false),
    delivered_at: timestamp("delivered_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
},
    (table) => [
        check("order_status_check", sql`${table.status} IN ('Order Placed', 'Order Created', 'Payment Failed', 'On Hold', 'Processing', 'Dispatched', 'In Transit', 'Out for Delivery', 'Delivered', 'Cancelled by Admin', 'Cancelled By user', 'Refunded', 'Failed')`),
        check("order_payment_method_check", sql`${table.payment_method} IN ('Razorpay', 'Cash on Delivery')`),
        index("order_user_id_index").on(table.user_id),
    ]);