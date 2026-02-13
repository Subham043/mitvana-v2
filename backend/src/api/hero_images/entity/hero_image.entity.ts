import { hero_image } from "src/database/schema";
import { sql } from "drizzle-orm";

export type HeroImageEntity = typeof hero_image.$inferSelect & { image_link: string }
export type NewHeroImageEntity = typeof hero_image.$inferInsert
export type UpdateHeroImageEntity = Omit<HeroImageEntity, 'id' | 'createdAt' | 'updatedAt' | 'image' | 'image_link'> & { image?: string }

export const HeroImageSelect = (domain: string) => ({
    id: hero_image.id,
    content: hero_image.content,
    image: hero_image.image,
    image_link: sql<string>`
    CASE
        WHEN ${hero_image.image} IS NOT NULL
        THEN CONCAT(${sql.raw(`'${domain}'`)}, ${hero_image.image})
        ELSE NULL
    END
    `,
    createdAt: hero_image.createdAt,
    updatedAt: hero_image.updatedAt,
})