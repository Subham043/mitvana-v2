
import type { PaginationType, AddressType } from "@/lib/types";
import { queryOptions, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getAddressHandler, getAddresssHandler } from "../dal/address";
import { useAuthStore } from "@/lib/store/auth.store";
import { useSearchParams } from "next/navigation";

export const AddressQueryKey = (id: string, isEdit: boolean = false) => {
    if (isEdit) {
        return ["address", id, "edit"]
    }
    return ["address", id, "view"]
};

export const AddressesQueryKey = (params: URLSearchParams) => {
    return ["addresses", params.toString()]
};

export const AddressQueryFn = async ({ id, signal }: { id: string, signal?: AbortSignal }) => {
    return await getAddressHandler(id, signal);
}

export const AddressesQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getAddresssHandler(params, signal);
}

export const AddressQueryOptions = (id: string, isEdit: boolean = false) => queryOptions({
    queryKey: AddressQueryKey(id, isEdit),
    queryFn: ({ signal }) =>
        AddressQueryFn({
            id,
            signal,
        }),
})

export const AddressesQueryOptions = (params: URLSearchParams) => queryOptions({
    queryKey: AddressesQueryKey(params),
    queryFn: ({ signal }) =>
        AddressesQueryFn({
            params,
            signal,
        }),
})

/*
  Address Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useAddressQuery: (id: string, enabled: boolean) => UseQueryResult<
    AddressType | undefined,
    unknown
> = (id, enabled) => {
    return useQuery({
        ...AddressQueryOptions(id, enabled),
        enabled: !!useAuthStore.getState().authToken && enabled,
    });
};

/*
  Addresss Query Hook Function: This hook is used to fetch information of all the tags
*/
export const useAddressesQuery: () => UseQueryResult<
    PaginationType<AddressType> | undefined,
    unknown
> = () => {
    const params = useSearchParams();
    return useQuery({
        ...AddressesQueryOptions(params),
        enabled: !!useAuthStore.getState().authToken,
    });
};