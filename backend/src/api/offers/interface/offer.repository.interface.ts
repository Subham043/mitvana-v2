import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewOfferEntity, UpdateOfferEntity, OfferQueryEntityType } from "../entity/offer.entity";
import { CustomQueryCacheConfig } from "src/utils/types";
import { OfferUpdateStatusDto } from "../schema/offer-update-status.schema";
import { OfferFilterDto } from "../schema/offer-filter.schema";

export interface OfferRepositoryInterface {
    getById(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<OfferQueryEntityType | null>;
    getAll(query: PaginationQuery<OfferFilterDto>, cacheConfig?: CustomQueryCacheConfig): Promise<OfferQueryEntityType[]>;
    count(query: Omit<PaginationQuery<OfferFilterDto>, 'offset' | 'limit' | 'page'>, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    createOffer(offer: NewOfferEntity): Promise<OfferQueryEntityType | null>;
    updateOffer(id: string, offer: UpdateOfferEntity): Promise<OfferQueryEntityType | null>;
    updateOfferStatus(id: string, offer: OfferUpdateStatusDto): Promise<OfferQueryEntityType | null>;
    deleteOffer(id: string): Promise<void>;
}