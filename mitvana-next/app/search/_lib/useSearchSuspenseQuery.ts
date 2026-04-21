import { PublishedProductsQueryFn, PublishedProductsQueryOptions } from "@/lib/data/queries/product";
import { SearchParamType } from "@/lib/types";
import { useSuspenseQuery } from "@tanstack/react-query";


export const useSearchSuspenseQuery = (params: SearchParamType) => {
    const options = PublishedProductsQueryOptions(params as unknown as URLSearchParams)
    return useSuspenseQuery({
        ...options,
        queryFn: ({ signal }) => {
            if (!params.search || params.search.length === 0) {
                return Promise.resolve({
                    data: [],
                    meta: {
                        total: 0,
                        page: 1,
                        limit: 10,
                        pages: 1,
                        search: "", // ✅ add missing fields
                    },
                });
            }

            return PublishedProductsQueryFn({
                params: params as unknown as URLSearchParams,
                signal,
            });
        },
    });
}