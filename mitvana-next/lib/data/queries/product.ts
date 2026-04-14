import type { PaginationType, ProductType, ProductListType } from "@/lib/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getPublishedProductsHandler, getProductBySlugHandler } from "../dal/products";
import { useSearchParams } from "next/navigation";

export const ProductSlugQueryKey = (slug: string) => {
    return ["product", "slug", slug]
};

export const PublishedProductsQueryKey = (params: URLSearchParams) => {
    return ["published_products", params.toString()]
};

export const ProductSlugQueryFn = async ({ slug, signal }: { slug: string, signal?: AbortSignal }) => {
    return await getProductBySlugHandler(slug, signal);
}

export const PublishedProductsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getPublishedProductsHandler(params, signal);
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
export const usePublishedProductsQuery: () => UseQueryResult<
    PaginationType<ProductListType> | undefined,
    unknown
> = () => {
    const params = useSearchParams();

    return useQuery({
        queryKey: PublishedProductsQueryKey(params),
        queryFn: ({ signal }) => PublishedProductsQueryFn({ params, signal }),
        enabled: true,
    });
};  