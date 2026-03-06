import { mysqlTable, varchar, timestamp } from "drizzle-orm/mysql-core";
import { order } from "./order.schema";
import { v7 as uuidv7 } from 'uuid';

export const order_shipment_tracking_nos = mysqlTable("order_shipment_tracking_nos", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => uuidv7()),
    order_id: varchar('order_id', { length: 255 }).notNull().references(() => order.id, {
        onDelete: 'cascade',
    }),
    tracking_no: varchar("tracking_no", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});