import { sql } from "drizzle-orm";
import { ingredient } from "src/database/schema";

export type IngredientEntity = typeof ingredient.$inferSelect & { thumbnail_link?: string }
export type NewIngredientEntity = typeof ingredient.$inferInsert
export type UpdateIngredientEntity = Omit<IngredientEntity, 'id' | 'createdAt' | 'updatedAt' | 'thumbnail'> & { thumbnail?: string }

export const IngredientSelect = (domain: string) => ({
    id: ingredient.id,
    title: ingredient.title,
    description: ingredient.description,
    thumbnail: ingredient.thumbnail,
    thumbnail_link: sql<string>`
    CASE
        WHEN ${ingredient.thumbnail} IS NOT NULL
        THEN CONCAT(${sql.raw(`'${domain}'`)}, ${ingredient.thumbnail})
        ELSE NULL
    END
    `,
    createdAt: ingredient.createdAt,
    updatedAt: ingredient.updatedAt,
})