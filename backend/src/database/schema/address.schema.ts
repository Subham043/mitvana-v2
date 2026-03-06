import { mysqlTable, varchar, timestamp, text, check, int } from "drizzle-orm/mysql-core";
import { v7 as uuidv7 } from 'uuid';
import { users } from "./users.schema";
import { pincode } from "./pincode.schema";
import { sql } from "drizzle-orm";

export const address = mysqlTable("address", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => uuidv7()),
    address: text("address"),
    address_2: text("address_2"),
    shipping_note: text("shipping_note"),
    city: varchar("city", { length: 255 }),
    state: varchar("state", { length: 255 }),
    phone_number: varchar("phone_number", { length: 255 }),
    first_name: varchar("first_name", { length: 255 }),
    last_name: varchar("last_name", { length: 255 }),
    postal_code: int('postal_code').notNull().references(() => pincode.pincode, {
        onDelete: 'cascade',
    }),
    address_type: varchar("address_type", { length: 255 }),
    country: varchar("country", { length: 255 }),
    company_name: varchar("company_name", { length: 255 }),
    alternate_phone: varchar("alternate_phone", { length: 255 }),
    user_id: varchar('user_id', { length: 255 }).notNull().references(() => users.id, {
        onDelete: 'cascade',
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
},
    (table) => [
        check("address_type_check", sql`${table.address_type} IN ('Home', 'Work')`)
    ]);