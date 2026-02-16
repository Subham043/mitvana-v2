import { PaginationDto } from "src/utils/pagination/schema/pagination.schema";
import { OfferQueryEntityType } from "../entity/offer.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { OfferDto } from "../schema/offer.schema";

export interface OfferServiceInterface {
    getById(id: string): Promise<OfferQueryEntityType>;
    getAll(query: PaginationDto): Promise<PaginationResponse<OfferQueryEntityType>>;
    createOffer(offer: OfferDto): Promise<OfferQueryEntityType>;
    updateOffer(id: string, offer: OfferDto): Promise<OfferQueryEntityType>;
    deleteOffer(id: string): Promise<void>;
}