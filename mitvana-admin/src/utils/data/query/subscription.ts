import { useAuthStore } from "@/stores/auth.store";
import type { PaginationQueryType, PaginationType, SubscriptionType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getSubscriptionHandler, getSubscriptionsHandler } from "../dal/subscriptions";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";


export const SubscriptionQueryKey = (id: string) => {
    return ["subscription", id]
};

export const SubscriptionsQueryKey = (query: PaginationQueryType) => {
    const { page = 1, limit = 10, search = "" } = query;
    return ["subscriptions", page, limit, search]
};

export const SubscriptionQueryFn = async ({ id, signal }: { id: string, signal?: AbortSignal }) => {
    return await getSubscriptionHandler(id, signal);
}

export const SubscriptionsQueryFn = async ({ query, signal }: { query: PaginationQueryType, signal?: AbortSignal }) => {
    return await getSubscriptionsHandler(query, signal);
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
        queryFn: () => SubscriptionQueryFn({ id }),
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
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, limit, search };

    return useQuery({
        queryKey: SubscriptionsQueryKey(query),
        queryFn: () => SubscriptionsQueryFn({ query }),
        enabled: authToken !== null,
    });
};