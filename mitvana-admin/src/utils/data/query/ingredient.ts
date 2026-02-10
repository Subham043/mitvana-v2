import { useAuthStore } from "@/stores/auth.store";
import type { PaginationType, IngredientType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getIngredientHandler, getIngredientsHandler } from "../dal/ingredients";
import { useSearchParams } from "react-router";


export const IngredientQueryKey = (id: string, isEdit: boolean = false) => {
    if (isEdit) {
        return ["ingredient", id, "edit"]
    }
    return ["ingredient", id, "view"]
};

export const IngredientsQueryKey = (params: URLSearchParams) => {
    return ["ingredients", params.toString()]
};

export const IngredientQueryFn = async ({ id, signal }: { id: string, signal?: AbortSignal }) => {
    return await getIngredientHandler(id, signal);
}

export const IngredientsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getIngredientsHandler(params, signal);
}

/*
  Ingredient Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useIngredientQuery: (id: string, enabled: boolean) => UseQueryResult<
    IngredientType | undefined,
    unknown
> = (id, enabled) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: IngredientQueryKey(id),
        queryFn: ({ signal }) => IngredientQueryFn({ id, signal }),
        enabled: authToken !== null && enabled,
    });
};


/*
  Ingredients Query Hook Function: This hook is used to fetch information of all the ingredients
*/
export const useIngredientsQuery: () => UseQueryResult<
    PaginationType<IngredientType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: IngredientsQueryKey(params),
        queryFn: ({ signal }) => IngredientsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};