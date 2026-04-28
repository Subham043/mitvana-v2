import type { PaginationType, ProductType, ProductListType } from "@/lib/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getPublishedProductsHandler, getProductBySlugHandler } from "../dal/products";
import { queryOptions } from '@tanstack/react-query'

export const ProductSlugQueryKey = (slug: string) => {
    return ["product", "slug", slug]
};

export const PublishedProductsQueryKey = (params?: URLSearchParams | Record<string, any>) => {
    const query = new URLSearchParams(params)
    if (query.get('limit') === null) {
        query.set('limit', '12');
    }
    if (query.get('sort_by') === null) {
        query.set('sort_by', 'createdAt');
    }
    if (query.get('sort_order') === null) {
        query.set('sort_order', 'asc');
    }
    return ["published_products", query.toString()]
};

export const ProductSlugQueryFn = async ({ slug, signal, token }: { slug: string, signal?: AbortSignal, token?: string }) => {
    return await getProductBySlugHandler(slug, signal, token);
}

export const PublishedProductsQueryFn = async ({ params, signal, token }: { params: URLSearchParams, signal?: AbortSignal, token?: string }) => {
    const query = new URLSearchParams(params)
    if (query.get('limit') === null) {
        query.set('limit', '12');
    }
    if (query.get('sort_by') === null) {
        query.set('sort_by', 'createdAt');
    }
    if (query.get('sort_order') === null) {
        query.set('sort_order', 'asc');
    }
    return await getPublishedProductsHandler(query, signal, token);
}

export const ProductSlugQueryOptions = (slug: string, token?: string) => queryOptions({
    queryKey: ProductSlugQueryKey(slug),
    queryFn: ({ signal }) =>
        ProductSlugQueryFn({
            slug,
            signal,
            token,
        }),
})

export const PublishedProductsQueryOptions = (params: URLSearchParams, token?: string) => queryOptions({
    queryKey: PublishedProductsQueryKey(params),
    queryFn: ({ signal }) =>
        PublishedProductsQueryFn({
            params,
            signal,
            token,
        }),
})

/*
  Product Slug Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useProductSlugQuery: (slug: string, token?: string, enabled?: boolean) => UseQueryResult<
    ProductType | undefined,
    unknown
> = (slug, token, enabled = false) => {

    return useQuery({
        ...ProductSlugQueryOptions(slug, token),
        enabled,
    });
};

/*
  Published Products Query Hook Function: This hook is used to fetch information of all the published products
*/
export const usePublishedProductsQuery: (params: URLSearchParams, token?: string) => UseQueryResult<
    PaginationType<ProductListType> | undefined,
    unknown
> = (params, token) => {
    return useQuery({
        ...PublishedProductsQueryOptions(params, token),
        enabled: true,
    });
};  