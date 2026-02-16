import { useAuthStore } from "@/stores/auth.store";
import type { PaginationType, OfferType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getOfferHandler, getOffersHandler } from "../dal/offers";
import { useSearchParams } from "react-router";


export const OfferQueryKey = (id: string, isEdit: boolean = false) => {
    if (isEdit) {
        return ["offer", id, "edit"]
    }
    return ["offer", id, "view"]
};

export const OffersQueryKey = (params: URLSearchParams) => {
    return ["offers", params.toString()]
};

export const OfferQueryFn = async ({ id, signal }: { id: string, signal?: AbortSignal }) => {
    return await getOfferHandler(id, signal);
}
export const OffersQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getOffersHandler(params, signal);
}

/*
  Offer Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useOfferQuery: (id: string, enabled: boolean) => UseQueryResult<
    OfferType | undefined,
    unknown
> = (id, enabled) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: OfferQueryKey(id),
        queryFn: ({ signal }) => OfferQueryFn({ id, signal }),
        enabled: authToken !== null && enabled,
    });
};

/*
  Offers Query Hook Function: This hook is used to fetch information of all the offers
*/
export const useOffersQuery: () => UseQueryResult<
    PaginationType<OfferType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: OffersQueryKey(params),
        queryFn: ({ signal }) => OffersQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};