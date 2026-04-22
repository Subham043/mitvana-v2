import { queryOptions, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getOrderHandler, getOrdersHandler } from "../dal/orders";
import { OrderInfoType, OrderListType, PaginationType } from "@/lib/types";
import { useAuthStore } from "@/lib/store/auth.store";
import { useSearchParams } from "next/navigation";


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

export const OrderQueryOptions = (id: string, isEdit: boolean = false) => queryOptions({
    queryKey: OrderQueryKey(id, isEdit),
    queryFn: ({ signal }) =>
        OrderQueryFn({
            id,
            signal,
        }),
})

export const OrdersQueryOptions = (params: URLSearchParams) => queryOptions({
    queryKey: OrdersQueryKey(params),
    queryFn: ({ signal }) =>
        OrdersQueryFn({
            params,
            signal,
        }),
})

/*
  Order Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useOrderQuery: (id: string, enabled: boolean) => UseQueryResult<
    OrderInfoType | undefined,
    unknown
> = (id, enabled) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        ...OrderQueryOptions(id),
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
    const params = useSearchParams();

    return useQuery({
        ...OrdersQueryOptions(params),
        enabled: authToken !== null,
    });
};