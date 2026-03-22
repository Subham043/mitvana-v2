import { OfferQueryEntityType } from "../entity/offer.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { OfferDto } from "../schema/offer.schema";
import { OfferUpdateStatusDto } from "../schema/offer-update-status.schema";
import { PassThrough } from "stream";
import { OfferFilterDto } from "../schema/offer-filter.schema";

export interface OfferServiceInterface {
    getById(id: string): Promise<OfferQueryEntityType>;
    getAll(query: OfferFilterDto): Promise<PaginationResponse<OfferQueryEntityType, Omit<OfferFilterDto, 'page' | 'limit' | 'offset' | 'search'>>>;
    createOffer(offer: OfferDto): Promise<OfferQueryEntityType>;
    updateOffer(id: string, offer: OfferDto): Promise<OfferQueryEntityType>;
    updateOfferStatus(id: string, offerStatus: OfferUpdateStatusDto): Promise<OfferQueryEntityType>;
    deleteOffer(id: string): Promise<void>;
    exportOffers(search?: string): Promise<PassThrough>;
}