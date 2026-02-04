import { useAuthStore } from "@/stores/auth.store";
import type { PaginationType, PincodeType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getPincodeByCodeHandler, getPincodeHandler, getPincodesHandler } from "../dal/pincodes";
import { useSearchParams } from "react-router";


export const PincodeQueryKey = (id: string, isEdit: boolean = false) => {
    if (isEdit) {
        return ["pincode", id, "edit"]
    }
    return ["pincode", id, "view"]
};

export const PincodeSlugQueryKey = (slug: string) => {
    return ["pincode", "slug", slug]
};

export const PincodesQueryKey = (params: URLSearchParams) => {
    return ["pincodes", params.toString()]
};

export const PincodeQueryFn = async ({ id, signal }: { id: string, signal?: AbortSignal }) => {
    return await getPincodeHandler(id, signal);
}

export const PincodeSlugQueryFn = async ({ slug, signal }: { slug: string, signal?: AbortSignal }) => {
    return await getPincodeByCodeHandler(slug, signal);
}

export const PincodesQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getPincodesHandler(params, signal);
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
        queryFn: ({ signal }) => PincodeQueryFn({ id, signal }),
        enabled: authToken !== null && enabled,
    });
};

/*
  Pincode Slug Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const usePincodeSlugQuery: (slug: string, enabled: boolean) => UseQueryResult<
    PincodeType | undefined,
    unknown
> = (slug, enabled) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: PincodeSlugQueryKey(slug),
        queryFn: ({ signal }) => PincodeSlugQueryFn({ slug, signal }),
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
    const [params] = useSearchParams();

    return useQuery({
        queryKey: PincodesQueryKey(params),
        queryFn: ({ signal }) => PincodesQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};