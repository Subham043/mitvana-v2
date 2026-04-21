
import type { PaginationType, ProductReviewStatsType, ProductReviewType } from "@/lib/types";
import { queryOptions, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getAllApprovedProductReviewsHandler, getProductReviewStatsHandler } from "../dal/product_review";

export const ProductReviewStatsQueryKey = (id: string) => {
    return ["product-review-stats", id]
};

export const AllApprovedProductReviewsQueryKey = (id: string, params: URLSearchParams) => {
    return ["all-approved-product-reviews", id, params.toString()]
};

export const ProductReviewStatsQueryFn = async ({ id, signal }: { id: string, signal?: AbortSignal }) => {
    return await getProductReviewStatsHandler(id, signal);
}

export const AllApprovedProductReviewsQueryFn = async ({ productId, params, signal }: { productId: string, params: URLSearchParams, signal?: AbortSignal }) => {
    return await getAllApprovedProductReviewsHandler(productId, params, signal);
}

export const ProductReviewStatsQueryOptions = (id: string) => queryOptions({
    queryKey: ProductReviewStatsQueryKey(id),
    queryFn: ({ signal }) => ProductReviewStatsQueryFn({ id, signal }),
});

export const AllApprovedProductReviewsQueryOptions = (id: string, params: URLSearchParams) => queryOptions({
    queryKey: AllApprovedProductReviewsQueryKey(id, params),
    queryFn: ({ signal }) => AllApprovedProductReviewsQueryFn({ productId: id, params, signal }),
});

/*
  Address Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useProductReviewStatsQuery: (id: string, enabled: boolean) => UseQueryResult<
    ProductReviewStatsType | undefined,
    unknown
> = (id, enabled) => {

    return useQuery({
        ...ProductReviewStatsQueryOptions(id),
        enabled: enabled,
    });
};

export const useAllApprovedProductReviewsQuery: (id: string, params: URLSearchParams, enabled: boolean) => UseQueryResult<
    PaginationType<ProductReviewType> | undefined,
    unknown
> = (id, params, enabled) => {

    return useQuery({
        ...AllApprovedProductReviewsQueryOptions(id, params),
        enabled: enabled,
    });
};