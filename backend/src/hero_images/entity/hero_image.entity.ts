import { hero_image } from "src/database/schema/hero_image.schema";

export type HeroImageEntity = typeof hero_image.$inferSelect
export type NewHeroImageEntity = typeof hero_image.$inferInsert
export type UpdateHeroImageEntity = Omit<HeroImageEntity, 'id' | 'createdAt' | 'updatedAt' | 'image'> & { image?: string }