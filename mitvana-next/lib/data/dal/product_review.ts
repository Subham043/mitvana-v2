import axios from "@/lib/axios";
import type { PaginationType, ProductReviewStatsType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { ProductReviewFormValuesType } from "@/lib/data/schemas/product_review";
import { api_routes } from "@/lib/constants/routes.option";
import type { ProductReviewType } from "@/lib/types";

export const createProductReviewHandler = async (val: ProductReviewFormValuesType, productId: string, signal?: GenericAbortSignal | undefined) => {
    const { captcha, ...rest } = val;
    const formData = new FormData();
    Object.entries(rest).forEach(([key, value]) => {
        if (value !== undefined) {
            if (value instanceof File) {
                formData.append(key, value);
            } else if (typeof value !== "string") {
                formData.append(key, value.toString());
            } else {
                formData.append(key, value);
            }
        }
    });
    formData.append("product_id", productId);
    const response = await axios.post<{ data: ProductReviewType }>(api_routes.product.review.create, formData, { signal, headers: { "Content-Type": "multipart/form-data", captcha } });
    return response.data.data;
}

export const getAllApprovedProductReviewsHandler = async (productId: string, params: URLSearchParams, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: PaginationType<ProductReviewType> }>(api_routes.product.review.stats + `/${productId}`, { params, signal });
    return response.data.data;
}

export const getProductReviewStatsHandler = async (productId: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.get<{ data: ProductReviewStatsType }>(api_routes.product.review.stats + `/${productId}/rating-stats`, { signal });
    return response.data.data;
}