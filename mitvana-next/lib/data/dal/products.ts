import axios from "@/lib/axios";
import type { PaginationType, ProductType, ProductListType } from "@/lib/types";
import type { GenericAbortSignal } from "axios";
import { api_routes } from "@/lib/constants/routes.option";

export const getProductBySlugHandler = async (slug: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: ProductType }>(api_routes.product.view + `/${slug}/public`, { signal });
    return response.data.data;
}

export const getPublishedProductsHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: PaginationType<ProductListType> }>(api_routes.product.get, { params, signal });
    return response.data.data;
}