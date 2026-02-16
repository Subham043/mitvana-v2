import { PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewProductEntity, UpdateProductEntity, ProductQueryEntityType, ProductListEntity } from "../entity/product.entity";
import { CustomQueryCacheConfig } from "src/utils/types";

export interface ProductRepositoryInterface {
    getByTitle(title: string): Promise<ProductQueryEntityType | null>;
    getBySlug(slug: string): Promise<ProductQueryEntityType | null>;
    getById(id: string): Promise<ProductQueryEntityType | null>;
    getAll(query: PaginationQuery, cacheConfig?: CustomQueryCacheConfig): Promise<ProductListEntity[]>;
    getAllPublished(query: PaginationQuery, cacheConfig?: CustomQueryCacheConfig): Promise<ProductListEntity[]>;
    count(search?: string, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    countPublished(search?: string, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    checkIdExists(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<boolean>;
    checkIdsExists(ids: string[], cacheConfig?: CustomQueryCacheConfig): Promise<{ id: string; exists: boolean }[]>;
    checkFaqsIdsExists(ids: string[], cacheConfig?: CustomQueryCacheConfig): Promise<{ id: string; exists: boolean }[]>;
    createProduct(product: NewProductEntity): Promise<ProductQueryEntityType | null>;
    updateProduct(id: string, product: UpdateProductEntity): Promise<ProductQueryEntityType | null>;
    deleteProduct(id: string): Promise<void>;
    deleteProductImage(id: string, imageId: string): Promise<void>;
}