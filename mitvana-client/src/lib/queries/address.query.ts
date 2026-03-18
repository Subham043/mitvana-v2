import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getAddressesServerFunc } from "@/lib/server_functions/address.server_function";
import { apiResolver } from "../utils";


export const AddressQueryKey = () => {
    return ["address"]
};

export const AddressQueryFn = async () => {
    const resp = await apiResolver(getAddressesServerFunc());
    return resp;
}

export const addressQueryOptions = () => ({
    queryKey: AddressQueryKey(),
    queryFn: () => AddressQueryFn(),
})

/*
  Address Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useAddressQuery = () => {
    return useQuery({
        ...addressQueryOptions(),
    });
};

export const useSuspenseAddressQuery = () => {

    return useSuspenseQuery({
        ...addressQueryOptions(),
    });
};