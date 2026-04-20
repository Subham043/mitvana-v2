import type { PaginationType, ProductType, ProductListType } from "@/lib/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getPublishedProductsHandler, getProductBySlugHandler } from "../dal/products";

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

export const ProductSlugQueryFn = async ({ slug, signal }: { slug: string, signal?: AbortSignal }) => {
    return await getProductBySlugHandler(slug, signal);
}

export const PublishedProductsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
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
    return await getPublishedProductsHandler(query, signal);
}

/*
  Product Slug Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useProductSlugQuery: (slug: string) => UseQueryResult<
    ProductType | undefined,
    unknown
> = (slug) => {

    return useQuery({
        queryKey: ProductSlugQueryKey(slug),
        queryFn: ({ signal }) => ProductSlugQueryFn({ slug, signal }),
        enabled: true,
    });
};

/*
  Published Products Query Hook Function: This hook is used to fetch information of all the published products
*/
export const usePublishedProductsQuery: (params: URLSearchParams) => UseQueryResult<
    PaginationType<ProductListType> | undefined,
    unknown
> = (params) => {
    return useQuery({
        queryKey: PublishedProductsQueryKey(params),
        queryFn: ({ signal }) => PublishedProductsQueryFn({ params, signal }),
        enabled: true,
    });
};  