import { mysqlTable, varchar, timestamp, text } from "drizzle-orm/mysql-core";
import { v4 as uuidv4 } from 'uuid';
import { users } from "./users.schema";

export const address = mysqlTable("address", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => uuidv4()),
    address: text("address"),
    address2: text("address2"),
    shippingNote: text("shippingNote"),
    city: varchar("city", { length: 255 }),
    state: varchar("state", { length: 255 }),
    phoneNumber: varchar("phoneNumber", { length: 255 }),
    firstName: varchar("firstName", { length: 255 }),
    lastName: varchar("lastName", { length: 255 }),
    postalCode: varchar("postalCode", { length: 255 }),
    addressType: varchar("addressType", { length: 255 }),
    country: varchar("country", { length: 255 }),
    companyName: varchar("companyName", { length: 255 }),
    alternatePhone: varchar("alternatePhone", { length: 255 }),
    user_id: varchar('user_id', { length: 255 }).notNull().references(() => users.id, {
        onDelete: 'cascade',
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});