import { mysqlTable, varchar, timestamp, int, date, boolean } from "drizzle-orm/mysql-core";
import { v7 as uuidv7 } from 'uuid';

export const coupon_code = mysqlTable("coupon_code", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => uuidv7()),
    code: varchar("code", { length: 255 }).unique().notNull(),
    discount_percentage: int("discount_percentage").notNull(),
    min_cart_value: int("min_cart_value").notNull(),
    maximum_redemptions: int("maximum_redemptions").notNull(),
    times_redeemed: int("times_redeemed").notNull().default(0),
    expiration_date: date("expiration_date").notNull(),
    is_draft: boolean("is_draft").notNull().default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});