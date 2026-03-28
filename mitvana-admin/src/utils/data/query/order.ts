import { useAuthStore } from "@/stores/auth.store";
import type { PaginationType, OrderInfoType, OrderListType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getOrderHandler, getOrdersHandler } from "../dal/orders";
import { useSearchParams } from "react-router";


export const OrderQueryKey = (id: string, isEdit: boolean = false) => {
    if (isEdit) {
        return ["order", id, "edit"]
    }
    return ["order", id, "view"]
};

export const OrdersQueryKey = (params: URLSearchParams) => {
    return ["orders", params.toString()]
};

export const OrderQueryFn = async ({ id, signal }: { id: string, signal?: AbortSignal }) => {
    return await getOrderHandler(id, signal);
}

export const OrdersQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getOrdersHandler(params, signal);
}

/*
  Order Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useOrderQuery: (id: string, enabled: boolean) => UseQueryResult<
    OrderInfoType | undefined,
    unknown
> = (id, enabled) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: OrderQueryKey(id),
        queryFn: ({ signal }) => OrderQueryFn({ id, signal }),
        enabled: authToken !== null && enabled,
    });
};

/*
  Orders Query Hook Function: This hook is used to fetch information of all the orders
*/
export const useOrdersQuery: () => UseQueryResult<
    PaginationType<OrderListType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: OrdersQueryKey(params),
        queryFn: ({ signal }) => OrdersQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};