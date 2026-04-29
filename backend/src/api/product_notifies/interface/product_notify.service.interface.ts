import { ProductNotifyQueryEntityType } from "../entity/product_notify.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { PaginationDto } from "src/utils/pagination/schema/pagination.schema";
import { ProductNotifyDto } from "../schema/product_notify.schema";

export interface ProductNotifyServiceInterface {
    getById(id: string): Promise<ProductNotifyQueryEntityType>;
    getAll(query: PaginationDto): Promise<PaginationResponse<ProductNotifyQueryEntityType>>;
    createProductNotify(notify: ProductNotifyDto): Promise<ProductNotifyQueryEntityType>;
    deleteProductNotify(id: string): Promise<void>;
}