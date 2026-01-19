import { useAuthStore } from "@/stores/auth.store";
import type { PaginationQueryType, PaginationType, PincodeType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getPincodeHandler, getPincodesHandler } from "../dal/pincodes";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";


export const PincodeQueryKey = (id: string) => {
    return ["pincode", id]
};

export const PincodesQueryKey = (query: PaginationQueryType) => {
    const { page = 1, limit = 10, search = "" } = query;
    return ["pincodes", page, limit, search]
};

export const PincodeQueryFn = async ({ id, signal }: { id: string, signal?: AbortSignal }) => {
    return await getPincodeHandler(id, signal);
}

export const PincodesQueryFn = async ({ query, signal }: { query: PaginationQueryType, signal?: AbortSignal }) => {
    return await getPincodesHandler(query, signal);
}

/*
  Pincode Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const usePincodeQuery: (id: string, enabled: boolean) => UseQueryResult<
    PincodeType | undefined,
    unknown
> = (id, enabled) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: PincodeQueryKey(id),
        queryFn: () => PincodeQueryFn({ id }),
        enabled: authToken !== null && enabled,
    });
};

/*
  Pincodes Query Hook Function: This hook is used to fetch information of all the pincodes
*/
export const usePincodesQuery: () => UseQueryResult<
    PaginationType<PincodeType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, limit, search };

    return useQuery({
        queryKey: PincodesQueryKey(query),
        queryFn: () => PincodesQueryFn({ query }),
        enabled: authToken !== null,
    });
};