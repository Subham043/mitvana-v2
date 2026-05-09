import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewProductNotifyEntity, ProductNotifyQueryEntityType } from "../entity/product_notify.entity";

export interface ProductNotifyRepositoryInterface {
    getById(id: string): Promise<ProductNotifyQueryEntityType | null>;
    getByProductIdAndEmail(productId: string, email: string): Promise<ProductNotifyQueryEntityType | null>;
    getAll(query: PaginationQuery): Promise<ProductNotifyQueryEntityType[]>;
    getAllEmailByProductId(query: PaginationQuery, productId: string): Promise<{ id: string, email: string }[]>;
    count(search?: string): Promise<number>
    createProductNotify(productNotify: NewProductNotifyEntity): Promise<ProductNotifyQueryEntityType | null>;
    deleteProductNotify(id: string): Promise<void>;
}