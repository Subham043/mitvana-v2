import { mysqlTable, varchar, timestamp, date } from "drizzle-orm/mysql-core";
import { order } from "./order.schema";
import { v7 as uuidv7 } from 'uuid';

export const order_shipment_check_points = mysqlTable("order_shipment_check_points", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => uuidv7()),
    order_id: varchar('order_id', { length: 255 }).notNull().references(() => order.id, {
        onDelete: 'cascade',
    }),
    city: varchar("city", { length: 255 }),
    remark: varchar("remark", { length: 255 }),
    state: varchar("state", { length: 255 }),
    sub_tag: varchar("sub_tag", { length: 255 }),
    tag: varchar("tag", { length: 255 }),
    date: date("date").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});