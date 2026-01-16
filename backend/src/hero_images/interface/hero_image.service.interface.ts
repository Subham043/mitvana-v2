import { PaginationDto } from "src/utils/pagination/schema/pagination.schema";
import { HeroImageEntity } from "../entity/hero_image.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { HeroImageCreateDto } from "../schema/hero-image-create.schema";
import { HeroImageUpdateDto } from "../schema/hero-image-update.schema";

export interface HeroImageServiceInterface {
    getById(id: string): Promise<HeroImageEntity>;
    getAll(query: PaginationDto): Promise<PaginationResponse<HeroImageEntity>>;
    createHeroImage(heroImage: HeroImageCreateDto): Promise<HeroImageEntity>;
    updateHeroImage(id: string, heroImage: HeroImageUpdateDto): Promise<HeroImageEntity>;
    deleteHeroImage(id: string): Promise<void>;
}