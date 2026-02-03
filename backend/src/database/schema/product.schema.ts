import { mysqlTable, varchar, timestamp, text, boolean, double, int } from "drizzle-orm/mysql-core";
import { v7 as uuidv7 } from 'uuid';

export const product = mysqlTable("product", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => uuidv7()),
    title: varchar("title", { length: 255 }).unique().notNull(),
    slug: varchar("slug", { length: 255 }).unique().notNull(),
    name: varchar("name", { length: 255 }),
    sub_title: varchar("sub_title", { length: 255 }),
    sku: varchar("sku", { length: 255 }),
    hsn: varchar("hsn", { length: 255 }),
    price: double("price", { precision: 10, scale: 2 }).notNull(),
    discounted_price: double("discounted_price", { precision: 10, scale: 2 }).notNull(),
    tax: int("tax").default(18),
    stock: int("stock").default(0),
    description: text("description"),
    how_to_use: text("how_to_use"),
    size_or_color: varchar("size_or_color", { length: 255 }),
    bought_text: varchar("bought_text", { length: 255 }),
    product_bought: varchar("product_bought", { length: 255 }).default(""),
    og_site_name: varchar("og_site_name", { length: 255 }),
    meta_description: text("meta_description"),
    facebook_description: text("facebook_description"),
    twitter_description: text("twitter_description"),
    custom_script: text("custom_script"),
    thumbnail: text("thumbnail"),
    is_draft: boolean("is_draft").notNull().default(true),
    product_selected: varchar('product_selected', { length: 255 }).references(() => product.id, {
        onDelete: 'set null',
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});