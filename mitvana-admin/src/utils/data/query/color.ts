import { useAuthStore } from "@/stores/auth.store";
import type { PaginationQueryType, PaginationType, ColorType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getColorHandler, getColorsHandler } from "../dal/colors";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";


export const ColorQueryKey = (id: string) => {
    return ["color", id]
};

export const ColorsQueryKey = (query: PaginationQueryType) => {
    const { page = 1, limit = 10, search = "" } = query;
    return ["users", page, limit, search]
};

export const ColorQueryFn = async ({ id, signal }: { id: string, signal?: AbortSignal }) => {
    return await getColorHandler(id, signal);
}

export const ColorsQueryFn = async ({ query, signal }: { query: PaginationQueryType, signal?: AbortSignal }) => {
    return await getColorsHandler(query, signal);
}

/*
  Color Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useColorQuery: (id: string, enabled: boolean) => UseQueryResult<
    ColorType | undefined,
    unknown
> = (id, enabled) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: ColorQueryKey(id),
        queryFn: () => ColorQueryFn({ id }),
        enabled: authToken !== null && enabled,
    });
};

/*
  Colors Query Hook Function: This hook is used to fetch information of all the colors
*/
export const useColorsQuery: () => UseQueryResult<
    PaginationType<ColorType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, limit, search };

    return useQuery({
        queryKey: ColorsQueryKey(query),
        queryFn: () => ColorsQueryFn({ query }),
        enabled: authToken !== null,
    });
};