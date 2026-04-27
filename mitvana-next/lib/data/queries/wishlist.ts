import type { PaginationType, WishlistType } from "@/lib/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getWishlistHandler } from "../dal/wishlist";
import { queryOptions } from '@tanstack/react-query'
import { useAuthStore } from "@/lib/store/auth.store";
import { useSearchParams } from "next/navigation";

export const WishlistQueryKey = (params?: URLSearchParams | Record<string, any>) => {
    const query = new URLSearchParams(params)
    if (query.get('limit') === null) {
        query.set('limit', '12');
    }
    return ["wishlist", query.toString()]
};

export const WishlistQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    const query = new URLSearchParams(params)
    if (query.get('limit') === null) {
        query.set('limit', '12');
    }
    return await getWishlistHandler(query, signal);
}

export const WishlistQueryOptions = (params: URLSearchParams) => queryOptions({
    queryKey: WishlistQueryKey(params),
    queryFn: ({ signal }) =>
        WishlistQueryFn({
            params,
            signal,
        }),
})

/*
  Published Products Query Hook Function: This hook is used to fetch information of all the published products
*/
export const useWishlistQuery: () => UseQueryResult<
    PaginationType<WishlistType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore(state => state.authToken);
    const params = useSearchParams();
    return useQuery({
        ...WishlistQueryOptions(params),
        enabled: !!authToken,
    });
};