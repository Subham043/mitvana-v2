import axios from "@/lib/axios";
import type { PaginationType, ProductType, ProductListType } from "@/lib/types";
import type { GenericAbortSignal } from "axios";
import { api_routes } from "@/lib/constants/routes.option";

export const getProductBySlugHandler = async (slug: string, signal?: GenericAbortSignal | undefined, token?: string) => {
    const response = await axios.get<{ data: ProductType }>(api_routes.product.view + `/${slug}/public`, { signal, headers: token ? { Authorization: `Bearer ${token}` } : undefined });
    return {
        ...response.data.data,
        child_products: response.data.data.child_products.map((item) => ({
            ...item,
            is_selected: item.slug === slug,
        })).sort((a, b) => {
            const getValue = (val: string | null) => {
                if (!val) return Number.MAX_SAFE_INTEGER; // push nulls to end
                return parseInt(val.replace(/[^0-9]/g, "")) || 0;
            };

            return getValue(a.size_or_color) - getValue(b.size_or_color);
        }),
    };
}

export const getPublishedProductsHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined, token?: string) => {
    const response = await axios.get<{ data: PaginationType<ProductListType> }>(api_routes.product.get, { params, signal, headers: token ? { Authorization: `Bearer ${token}` } : undefined });
    return response.data.data;
}