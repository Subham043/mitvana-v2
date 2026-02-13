import { PaginationDto } from "src/utils/pagination/schema/pagination.schema";
import { ProductQueryEntityType } from "../entity/product.entity";
import { PaginationResponse } from "src/utils/pagination/normalize.pagination";
import { ProductCreateDto } from "../schema/product-create.schema";
import { ProductUpdateDto } from "../schema/product-update.schema";

export interface ProductServiceInterface {
    getByTitle(title: string): Promise<ProductQueryEntityType>;
    getBySlug(slug: string): Promise<ProductQueryEntityType>;
    getById(id: string): Promise<ProductQueryEntityType>;
    getAll(query: PaginationDto): Promise<PaginationResponse<ProductQueryEntityType>>;
    createProduct(product: ProductCreateDto): Promise<ProductQueryEntityType>;
    updateProduct(id: string, product: ProductUpdateDto): Promise<ProductQueryEntityType>;
    deleteProduct(id: string): Promise<void>;
}