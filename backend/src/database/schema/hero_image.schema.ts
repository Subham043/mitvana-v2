import { mysqlTable, varchar, timestamp, text } from "drizzle-orm/mysql-core";
import { v4 as uuidv4 } from 'uuid';

export const hero_image = mysqlTable("hero_image", {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(() => uuidv4()),
    content: text("content").notNull(),
    image: text("image").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});