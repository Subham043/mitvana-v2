import { useAuthStore } from "@/stores/auth.store";
import type { PaginationType, CategoryType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getCategoryHandler, getCategoriesHandler, getCategoryBySlugHandler } from "../dal/categories";
import { useSearchParams } from "react-router";


export const CategoryQueryKey = (id: string, isEdit: boolean = false) => {
    if (isEdit) {
        return ["category", id, "edit"]
    }
    return ["category", id, "view"]
};

export const CategorySlugQueryKey = (slug: string) => {
    return ["category", "slug", slug]
};

export const CategoriesQueryKey = (params: URLSearchParams) => {
    return ["categories", params.toString()]
};

export const CategoryQueryFn = async ({ id, signal }: { id: string, signal?: AbortSignal }) => {
    return await getCategoryHandler(id, signal);
}

export const CategorySlugQueryFn = async ({ slug, signal }: { slug: string, signal?: AbortSignal }) => {
    return await getCategoryBySlugHandler(slug, signal);
}

export const CategoriesQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getCategoriesHandler(params, signal);
}

/*
  Category Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useCategoryQuery: (id: string, enabled: boolean) => UseQueryResult<
    CategoryType | undefined,
    unknown
> = (id, enabled) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: CategoryQueryKey(id),
        queryFn: ({ signal }) => CategoryQueryFn({ id, signal }),
        enabled: authToken !== null && enabled,
    });
};

/*
  Category Slug Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useCategorySlugQuery: (slug: string, enabled: boolean) => UseQueryResult<
    CategoryType | undefined,
    unknown
> = (slug, enabled) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: CategorySlugQueryKey(slug),
        queryFn: ({ signal }) => CategorySlugQueryFn({ slug, signal }),
        enabled: authToken !== null && enabled,
    });
};

/*
  Categories Query Hook Function: This hook is used to fetch information of all the categories
*/
export const useCategoriesQuery: () => UseQueryResult<
    PaginationType<CategoryType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: CategoriesQueryKey(params),
        queryFn: ({ signal }) => CategoriesQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};