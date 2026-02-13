import { useAuthStore } from "@/stores/auth.store";
import type { PaginationType, ProductType, ProductListType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getProductHandler, getProductsHandler, getPublishedProductsHandler, getProductBySlugHandler } from "../dal/products";
import { useSearchParams } from "react-router";


export const ProductQueryKey = (id: string, isEdit: boolean = false) => {
    if (isEdit) {
        return ["product", id, "edit"]
    }
    return ["product", id, "view"]
};

export const ProductSlugQueryKey = (slug: string) => {
    return ["product", "slug", slug]
};

export const ProductsQueryKey = (params: URLSearchParams) => {
    return ["products", params.toString()]
};

export const PublishedProductsQueryKey = (params: URLSearchParams) => {
    return ["published_products", params.toString()]
};

export const ProductQueryFn = async ({ id, signal }: { id: string, signal?: AbortSignal }) => {
    return await getProductHandler(id, signal);
}

export const ProductSlugQueryFn = async ({ slug, signal }: { slug: string, signal?: AbortSignal }) => {
    return await getProductBySlugHandler(slug, signal);
}

export const ProductsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getProductsHandler(params, signal);
}

export const PublishedProductsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getPublishedProductsHandler(params, signal);
}

/*
  Product Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useProductQuery: (id: string, enabled: boolean) => UseQueryResult<
    ProductType | undefined,
    unknown
> = (id, enabled) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: ProductQueryKey(id),
        queryFn: ({ signal }) => ProductQueryFn({ id, signal }),
        enabled: authToken !== null && enabled,
    });
};

/*
  Product Slug Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useProductSlugQuery: (slug: string, enabled: boolean) => UseQueryResult<
    ProductType | undefined,
    unknown
> = (slug, enabled) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: ProductSlugQueryKey(slug),
        queryFn: ({ signal }) => ProductSlugQueryFn({ slug, signal }),
        enabled: authToken !== null && enabled,
    });
};

/*
  Products Query Hook Function: This hook is used to fetch information of all the products
*/
export const useProductsQuery: () => UseQueryResult<
    PaginationType<ProductListType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: ProductsQueryKey(params),
        queryFn: ({ signal }) => ProductsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};

/*
  Published Products Query Hook Function: This hook is used to fetch information of all the published products
*/
export const usePublishedProductsQuery: () => UseQueryResult<
    PaginationType<ProductListType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: PublishedProductsQueryKey(params),
        queryFn: ({ signal }) => PublishedProductsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};  