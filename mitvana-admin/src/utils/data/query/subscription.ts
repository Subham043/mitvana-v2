import { useAuthStore } from "@/stores/auth.store";
import type { PaginationType, SubscriptionType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getSubscriptionHandler, getSubscriptionsHandler } from "../dal/subscriptions";
import { useSearchParams } from "react-router";


export const SubscriptionQueryKey = (id: string, isEdit: boolean = false) => {
    if (isEdit) {
        return ["subscription", id, "edit"]
    }
    return ["subscription", id, "view"]
};

export const SubscriptionsQueryKey = (params: URLSearchParams) => {
    return ["subscriptions", params.toString()]
};

export const SubscriptionQueryFn = async ({ id, signal }: { id: string, signal?: AbortSignal }) => {
    return await getSubscriptionHandler(id, signal);
}

export const SubscriptionsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getSubscriptionsHandler(params, signal);
}

/*
  Subscription Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useSubscriptionQuery: (id: string, enabled: boolean) => UseQueryResult<
    SubscriptionType | undefined,
    unknown
> = (id, enabled) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: SubscriptionQueryKey(id),
        queryFn: ({ signal }) => SubscriptionQueryFn({ id, signal }),
        enabled: authToken !== null && enabled,
    });
};

/*
  Subscriptions Query Hook Function: This hook is used to fetch information of all the subscriptions
*/
export const useSubscriptionsQuery: () => UseQueryResult<
    PaginationType<SubscriptionType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: SubscriptionsQueryKey(params),
        queryFn: ({ signal }) => SubscriptionsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};