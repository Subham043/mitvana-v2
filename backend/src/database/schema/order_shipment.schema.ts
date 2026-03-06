import { mysqlTable, varchar, timestamp, date } from "drizzle-orm/mysql-core";
import { order } from "./order.schema";

export const order_shipment = mysqlTable("order_shipment", {
    order_id: varchar('order_id', { length: 255 }).primaryKey().references(() => order.id, {
        onDelete: 'cascade',
    }),
    tracking_link: varchar("tracking_link", { length: 255 }),
    expected_delivery_date: date("expected_delivery_date").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});