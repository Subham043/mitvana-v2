import { ProductListEntity, ProductQueryEntityType, PublicProductListEntity } from "../entity/product.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { ProductCreateDto } from "../schema/product-create.schema";
import { ProductUpdateDto } from "../schema/product-update.schema";
import { ProductUpdateStatusDto } from "../schema/product-update-status.schema";
import { PassThrough } from "stream";
import { ProductFilterDto } from "../schema/product-filter.schema";

export interface ProductServiceInterface {
    getByTitle(title: string): Promise<ProductQueryEntityType>;
    getBySlug(slug: string): Promise<ProductQueryEntityType>;
    getById(id: string): Promise<ProductQueryEntityType>;
    getAll(query: ProductFilterDto): Promise<PaginationResponse<ProductListEntity, ProductFilterDto>>;
    getAllPublished(query: ProductFilterDto): Promise<PaginationResponse<ProductListEntity, ProductFilterDto>>;
    createProduct(product: ProductCreateDto): Promise<ProductQueryEntityType>;
    updateProduct(id: string, product: ProductUpdateDto): Promise<ProductQueryEntityType>;
    updateProductStatus(id: string, productStatus: ProductUpdateStatusDto): Promise<ProductQueryEntityType>;
    deleteProduct(id: string): Promise<void>;
    deleteProductImage(id: string, imageId: string): Promise<void>;
    exportProducts(query: ProductFilterDto): Promise<PassThrough>;
    getAllPublishedForPublic(query: ProductFilterDto): Promise<PaginationResponse<PublicProductListEntity, ProductFilterDto>>;
    getBySlugForPublic(slug: string): Promise<ProductQueryEntityType>;
}