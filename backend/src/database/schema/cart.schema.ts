import { mysqlTable, varchar, timestamp, boolean } from "drizzle-orm/mysql-core";
import { users } from "./users.schema";
import { coupon_code } from "./coupon_code.schema";
import { address } from "./address.schema";

export const cart = mysqlTable("cart", {
    user_id: varchar('user_id', { length: 255 }).primaryKey().references(() => users.id, {
        onDelete: 'cascade',
    }),
    coupon_code: varchar('coupon_code', { length: 255 }).references(() => coupon_code.code, {
        onDelete: 'set null',
    }),
    address_id: varchar('address_id', { length: 255 }).references(() => address.id, {
        onDelete: 'set null',
    }),
    is_mail_sent: boolean("is_mail_sent").notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});