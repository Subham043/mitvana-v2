import axios from "@/lib/axios";
import type { PaginationType, ProductReviewStatsType } from "../../types";
import type { GenericAbortSignal } from "axios";
import type { ProductReviewFormValuesType } from "@/lib/data/schemas/product_review";
import { api_routes } from "@/lib/constants/routes.option";
import type { ProductReviewType } from "@/lib/types";

export const createProductReviewHandler = async (val: ProductReviewFormValuesType, productId: string, signal?: GenericAbortSignal | undefined) => {
    const response = await axios.post<{ data: ProductReviewType }>(api_routes.product.review.create, { ...val, product_id: productId }, { signal });
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