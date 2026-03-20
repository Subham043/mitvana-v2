import { useAuthStore } from "@/stores/auth.store";
import type { PaginationType, ProductReviewType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getProductReviewHandler, getProductReviewsHandler } from "../dal/product_reviews";
import { useSearchParams } from "react-router";


export const ProductReviewQueryKey = (id: string, isEdit: boolean = false) => {
    if (isEdit) {
        return ["product_review", id, "edit"]
    }
    return ["product_review", id, "view"]
};

export const ProductReviewsQueryKey = (params: URLSearchParams) => {
    return ["product_reviews", params.toString()]
};

export const ProductReviewQueryFn = async ({ id, signal }: { id: string, signal?: AbortSignal }) => {
    return await getProductReviewHandler(id, signal);
}

export const ProductReviewsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getProductReviewsHandler(params, signal);
}

/*
  Product Review Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useProductReviewQuery: (id: string, enabled: boolean) => UseQueryResult<
    ProductReviewType | undefined,
    unknown
> = (id, enabled) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: ProductReviewQueryKey(id),
        queryFn: ({ signal }) => ProductReviewQueryFn({ id, signal }),
        enabled: authToken !== null && enabled,
    });
};

/*
  Product Reviews Query Hook Function: This hook is used to fetch information of all the products
*/
export const useProductReviewsQuery: () => UseQueryResult<
    PaginationType<ProductReviewType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: ProductReviewsQueryKey(params),
        queryFn: ({ signal }) => ProductReviewsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};