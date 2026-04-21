
import type { PaginationType, AddressType } from "@/lib/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
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

/*
  Address Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useAddressQuery: (id: string, enabled: boolean) => UseQueryResult<
    AddressType | undefined,
    unknown
> = (id, enabled) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: AddressQueryKey(id),
        queryFn: ({ signal }) => AddressQueryFn({ id, signal }),
        enabled: authToken !== null && enabled,
    });
};

/*
  Addresss Query Hook Function: This hook is used to fetch information of all the tags
*/
export const useAddressesQuery: () => UseQueryResult<
    PaginationType<AddressType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const params = useSearchParams();

    return useQuery({
        queryKey: AddressesQueryKey(params),
        queryFn: ({ signal }) => AddressesQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};