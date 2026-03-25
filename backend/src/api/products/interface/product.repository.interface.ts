import { CountQuery, PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewProductEntity, UpdateProductEntity, ProductQueryEntityType, ProductListEntity, PublicProductListEntity } from "../entity/product.entity";
import { CustomQueryCacheConfig } from "src/utils/types";
import { ProductUpdateStatusDto } from "../schema/product-update-status.schema";
import { ProductFilterDto } from "../schema/product-filter.schema";

export interface ProductRepositoryInterface {
    getByTitle(title: string, cacheConfig?: CustomQueryCacheConfig): Promise<ProductQueryEntityType | null>;
    getBySlug(slug: string, cacheConfig?: CustomQueryCacheConfig): Promise<ProductQueryEntityType | null>;
    getById(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<ProductQueryEntityType | null>;
    getAll(query: PaginationQuery<ProductFilterDto>, cacheConfig?: CustomQueryCacheConfig): Promise<ProductListEntity[]>;
    getAllPublished(query: PaginationQuery<ProductFilterDto>, cacheConfig?: CustomQueryCacheConfig): Promise<ProductListEntity[]>;
    count(query: CountQuery<ProductFilterDto>, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    countPublished(query: CountQuery<ProductFilterDto>, cacheConfig?: CustomQueryCacheConfig): Promise<number>
    checkIdExists(id: string, cacheConfig?: CustomQueryCacheConfig): Promise<boolean>;
    checkIdsExists(ids: string[], cacheConfig?: CustomQueryCacheConfig): Promise<{ id: string; exists: boolean }[]>;
    checkFaqsIdsExists(ids: string[], cacheConfig?: CustomQueryCacheConfig): Promise<{ id: string; exists: boolean }[]>;
    createProduct(product: NewProductEntity): Promise<ProductQueryEntityType | null>;
    updateProduct(id: string, product: UpdateProductEntity): Promise<ProductQueryEntityType | null>;
    updateProductStatus(id: string, product: ProductUpdateStatusDto): Promise<ProductQueryEntityType | null>;
    deleteProduct(id: string): Promise<void>;
    deleteProductImage(id: string, imageId: string): Promise<void>;
    getAllPublishedForPublic(query: PaginationQuery<ProductFilterDto>, cacheConfig?: CustomQueryCacheConfig): Promise<PublicProductListEntity[]>;
    countPublishedForPublic(query: CountQuery<ProductFilterDto>, cacheConfig?: CustomQueryCacheConfig): Promise<number>;
    getBySlugForPublic(slug: string, cacheConfig?: CustomQueryCacheConfig): Promise<ProductQueryEntityType | null>;
}