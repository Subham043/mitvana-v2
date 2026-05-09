import { CountQuery, PaginationQuery } from "src/utils/pagination/normalize.pagination";
import { NewProductEntity, UpdateProductEntity, ProductQueryEntityType, ProductListEntity, PublicProductListEntity } from "../entity/product.entity";
import { ProductUpdateStatusDto } from "../schema/product-update-status.schema";
import { ProductFilterDto } from "../schema/product-filter.schema";

export interface ProductRepositoryInterface {
    getByTitle(title: string): Promise<ProductQueryEntityType | null>;
    getBySlug(slug: string): Promise<ProductQueryEntityType | null>;
    getById(id: string): Promise<ProductQueryEntityType | null>;
    getAll(query: PaginationQuery<ProductFilterDto>): Promise<ProductListEntity[]>;
    getAllPublished(query: PaginationQuery<ProductFilterDto>): Promise<ProductListEntity[]>;
    count(query: CountQuery<ProductFilterDto>): Promise<number>
    countPublished(query: CountQuery<ProductFilterDto>): Promise<number>
    checkIdExists(id: string): Promise<boolean>;
    checkIdsExists(ids: string[]): Promise<{ id: string; exists: boolean }[]>;
    checkFaqsIdsExists(ids: string[]): Promise<{ id: string; exists: boolean }[]>;
    createProduct(product: NewProductEntity): Promise<ProductQueryEntityType | null>;
    updateProduct(id: string, product: UpdateProductEntity): Promise<ProductQueryEntityType | null>;
    updateProductStatus(id: string, product: ProductUpdateStatusDto & { published_at: Date | null }): Promise<ProductQueryEntityType | null>;
    deleteProduct(id: string): Promise<void>;
    deleteProductImage(id: string, imageId: string): Promise<void>;
    getAllPublishedForPublic(query: PaginationQuery<ProductFilterDto>, userId?: string): Promise<PublicProductListEntity[]>;
    countPublishedForPublic(query: CountQuery<ProductFilterDto>): Promise<number>;
    getBySlugForPublic(slug: string, userId?: string): Promise<ProductQueryEntityType | null>;
    bulkDeductProductStock(data: { id: string, quantity: number }[]): Promise<void>;
    checkIdsStockExists(data: { id: string, quantity: number }[]): Promise<{ id: string; in_stock: boolean }[]>;
}