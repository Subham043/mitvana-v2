import { mysqlTable, varchar, timestamp, text, int } from "drizzle-orm/mysql-core";
import { v7 as uuidv7 } from 'uuid';

export const setting = mysqlTable("setting", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => uuidv7()),
    admin_email: varchar("admin_email", { length: 255 }),
    top_banner_text: text("top_banner_text"),
    min_cart_value_for_free_shipping: int("min_cart_value_for_free_shipping").default(500),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});