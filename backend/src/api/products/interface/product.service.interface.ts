import { PaginationDto } from "src/utils/pagination/schema/pagination.schema";
import { ProductListEntity, ProductQueryEntityType } from "../entity/product.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { ProductCreateDto } from "../schema/product-create.schema";
import { ProductUpdateDto } from "../schema/product-update.schema";
import { ProductUpdateStatusDto } from "../schema/product-update-status.schema";
import { PassThrough } from "stream";

export interface ProductServiceInterface {
    getByTitle(title: string): Promise<ProductQueryEntityType>;
    getBySlug(slug: string): Promise<ProductQueryEntityType>;
    getById(id: string): Promise<ProductQueryEntityType>;
    getAll(query: PaginationDto): Promise<PaginationResponse<ProductListEntity>>;
    getAllPublished(query: PaginationDto): Promise<PaginationResponse<ProductListEntity>>;
    createProduct(product: ProductCreateDto): Promise<ProductQueryEntityType>;
    updateProduct(id: string, product: ProductUpdateDto): Promise<ProductQueryEntityType>;
    updateProductStatus(id: string, productStatus: ProductUpdateStatusDto): Promise<ProductQueryEntityType>;
    deleteProduct(id: string): Promise<void>;
    deleteProductImage(id: string, imageId: string): Promise<void>;
    exportProducts(search?: string): Promise<PassThrough>;
    getAllPublishedForPublic(query: PaginationDto): Promise<PaginationResponse<ProductListEntity>>;
    getBySlugForPublic(slug: string): Promise<ProductQueryEntityType>;
}