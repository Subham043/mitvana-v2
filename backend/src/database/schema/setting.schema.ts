import { mysqlTable, varchar, timestamp, text, int } from "drizzle-orm/mysql-core";
import { v4 as uuidv4 } from 'uuid';

export const setting = mysqlTable("setting", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => uuidv4()),
    admin_email: varchar("admin_email", { length: 255 }).notNull(),
    top_banner_text: text("top_banner_text").notNull(),
    min_cart_value_for_free_shipping: int("min_cart_value_for_free_shipping").default(500),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});