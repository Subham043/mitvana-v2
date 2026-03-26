import { mysqlTable, varchar, timestamp, uniqueIndex, text, int } from "drizzle-orm/mysql-core";
import { address } from "./address.schema";
import { order } from "./order.schema";
import { pincode } from "./pincode.schema";

export const order_address = mysqlTable("order_address", {
    order_id: varchar('order_id', { length: 255 }).primaryKey().references(() => order.id, {
        onDelete: 'cascade',
    }),
    address: text("address"),
    address_2: text("address_2"),
    shipping_note: text("shipping_note"),
    city: varchar("city", { length: 255 }),
    state: varchar("state", { length: 255 }),
    phone_number: varchar("phone_number", { length: 255 }),
    first_name: varchar("first_name", { length: 255 }),
    last_name: varchar("last_name", { length: 255 }),
    postal_code: int('postal_code').notNull().references(() => pincode.pincode, {
        onDelete: 'no action',
    }),
    country: varchar("country", { length: 255 }),
    company_name: varchar("company_name", { length: 255 }),
    alternate_phone: varchar("alternate_phone", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});