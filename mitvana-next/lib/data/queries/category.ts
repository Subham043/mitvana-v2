import { getCategoriesHandler } from "../dal/categories";
import { queryOptions, useInfiniteQuery, UseInfiniteQueryResult, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { PaginationType, CategoryType } from "@/lib/types";
import { useSearchParams } from "next/navigation";


export const CategoriesQueryKey = (params: URLSearchParams) => {
    return ["categories", params.toString()]
};

export const CategoriesQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getCategoriesHandler(params, signal);
}


export const CategoriesQueryOptions = (params: URLSearchParams) => queryOptions({
    queryKey: CategoriesQueryKey(params),
    queryFn: ({ signal }) =>
        CategoriesQueryFn({
            params,
            signal,
        }),
})

export const useCategoriesQuery: () => UseQueryResult<
    PaginationType<CategoryType> | undefined,
    unknown
> = () => {
    const params = useSearchParams();

    return useQuery({
        ...CategoriesQueryOptions(params),
    });
};

export const useCategoriesInfiniteQuery: (params: URLSearchParams, enabled?: boolean) => UseInfiniteQueryResult<{
    pages: CategoryType[];
    pageParams: number[];
}, Error> = (params: URLSearchParams, enabled: boolean = true) => {

    return useInfiniteQuery({
        queryKey: CategoriesQueryKey(params),

        queryFn: ({ pageParam = 1, signal }) => {
            const newParams = new URLSearchParams(params.toString());
            newParams.set("page", pageParam.toString());

            return CategoriesQueryFn({
                params: newParams,
                signal,
            });
        },

        initialPageParam: 1,

        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage) return undefined;

            const morePagesExist =
                allPages.flatMap((page) => page.data).length !==
                lastPage.meta.total;
            if (morePagesExist) {
                return allPages.length + 1;
            }
            return undefined;
        },

        select: (data) => {
            return {
                ...data,
                pages: data.pages.flatMap((page) => page.data),
            };
        },

        enabled,
    });
};