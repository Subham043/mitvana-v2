import { sql } from "drizzle-orm";
import { category } from "src/database/schema";

export type CategoryEntity = typeof category.$inferSelect & { thumbnail_link?: string }
export type NewCategoryEntity = typeof category.$inferInsert
export type UpdateCategoryEntity = Omit<CategoryEntity, 'id' | 'createdAt' | 'updatedAt' | 'thumbnail'> & { thumbnail?: string }

export const CategorySelect = (domain: string) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    thumbnail: category.thumbnail,
    thumbnail_link: sql<string>`
    CASE
        WHEN ${category.thumbnail} IS NOT NULL
        THEN CONCAT(${sql.raw(`'${domain}'`)}, ${category.thumbnail})
        ELSE NULL
    END
    `,
    is_visible_in_navigation: category.is_visible_in_navigation,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
})