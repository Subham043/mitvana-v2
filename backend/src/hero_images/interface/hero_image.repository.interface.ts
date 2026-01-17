import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewHeroImageEntity, UpdateHeroImageEntity, HeroImageEntity } from "../entity/hero_image.entity";
import { CustomQueryCacheConfig } from "src/utils/types";

export interface HeroImageRepositoryInterface {
    getById(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<HeroImageEntity | null>;
    getAll(query: PaginationQuery, cacheConfig?: CustomQueryCacheConfig): Promise<HeroImageEntity[]>;
    count(search?: string, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    createHeroImage(heroImage: NewHeroImageEntity): Promise<HeroImageEntity | null>;
    updateHeroImage(id: string, heroImage: UpdateHeroImageEntity): Promise<HeroImageEntity | null>;
    deleteHeroImage(id: string): Promise<void>;
}