import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewOfferEntity, UpdateOfferEntity, OfferQueryEntityType } from "../entity/offer.entity";
import { CustomQueryCacheConfig } from "src/utils/types";

export interface OfferRepositoryInterface {
    getById(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<OfferQueryEntityType | null>;
    getAll(query: PaginationQuery, cacheConfig?: CustomQueryCacheConfig): Promise<OfferQueryEntityType[]>;
    count(search?: string, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    createOffer(offer: NewOfferEntity): Promise<OfferQueryEntityType | null>;
    updateOffer(id: string, offer: UpdateOfferEntity): Promise<OfferQueryEntityType | null>;
    deleteOffer(id: string): Promise<void>;
}