import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewHeroImageEntity, UpdateHeroImageEntity, HeroImageEntity } from "../entity/hero_image.entity";

export interface HeroImageRepositoryInterface {
    getById(id: string): Promise<HeroImageEntity | null>;
    getAll(query: PaginationQuery): Promise<HeroImageEntity[]>;
    count(search?: string): Promise<number>
    createHeroImage(heroImage: NewHeroImageEntity): Promise<HeroImageEntity | null>;
    updateHeroImage(id: string, heroImage: UpdateHeroImageEntity): Promise<HeroImageEntity | null>;
    deleteHeroImage(id: string): Promise<void>;
}