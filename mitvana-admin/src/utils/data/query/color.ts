import { useAuthStore } from "@/stores/auth.store";
import type { PaginationType, ColorType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getColorHandler, getColorsHandler } from "../dal/colors";
import { useSearchParams } from "react-router";


export const ColorQueryKey = (id: string, isEdit: boolean = false) => {
    if (isEdit) {
        return ["color", id, "edit"]
    }
    return ["color", id, "view"]
};

export const ColorsQueryKey = (params: URLSearchParams) => {
    return ["colors", params.toString()]
};

export const ColorQueryFn = async ({ id, signal }: { id: string, signal?: AbortSignal }) => {
    return await getColorHandler(id, signal);
}

export const ColorsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getColorsHandler(params, signal);
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
        queryFn: ({ signal }) => ColorQueryFn({ id, signal }),
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
    const [params] = useSearchParams();

    return useQuery({
        queryKey: ColorsQueryKey(params),
        queryFn: ({ signal }) => ColorsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};