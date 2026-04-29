import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewProductNotifyEntity, ProductNotifyQueryEntityType } from "../entity/product_notify.entity";
import { CustomQueryCacheConfig } from "src/utils/types";

export interface ProductNotifyRepositoryInterface {
    getById(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<ProductNotifyQueryEntityType | null>;
    getByProductIdAndEmail(productId: string, email: string, cacheConfig?: CustomQueryCacheConfig): Promise<ProductNotifyQueryEntityType | null>;
    getAll(query: PaginationQuery, cacheConfig?: CustomQueryCacheConfig): Promise<ProductNotifyQueryEntityType[]>;
    count(search?: string, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    createProductNotify(productNotify: NewProductNotifyEntity): Promise<ProductNotifyQueryEntityType | null>;
    deleteProductNotify(id: string): Promise<void>;
}