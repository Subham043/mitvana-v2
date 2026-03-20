import axios from "@/utils/axios";
import { api_routes } from "../../routes/api_routes";
import type { PaginationType, ProductReviewType } from "../../types";
import type { GenericAbortSignal } from "axios";

export const updateProductReviewStatusHandler = async (id: string, val: { status: "pending" | "approved" | "rejected" }, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.put<{ data: ProductReviewType }>(api_routes.product_reviews.toggleStatus + `/${id}`, val, { signal });
    return response.data.data;
}

export const deleteProductReviewHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    await axios.delete<{ data: ProductReviewType }>(api_routes.product_reviews.delete + `/${id}`, { signal });
}

export const getProductReviewHandler = async (id: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: ProductReviewType }>(api_routes.product_reviews.view + `/${id}`, { signal });
    return response.data.data;
}

export const getProductReviewsHandler = async (params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: PaginationType<ProductReviewType> }>(api_routes.product_reviews.paginate, { params, signal });
    return response.data.data;
}