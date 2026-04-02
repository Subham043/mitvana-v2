import { useAuthStore } from "@/stores/auth.store";
import type { PaginationType, PaymentListType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getPaymentsHandler } from "../dal/payments";
import { useSearchParams } from "react-router";

export const PaymentsQueryKey = (params: URLSearchParams) => {
    return ["payments", params.toString()]
};

export const PaymentsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getPaymentsHandler(params, signal);
}

/*
  Payments Query Hook Function: This hook is used to fetch information of all the payments
*/
export const usePaymentsQuery: () => UseQueryResult<
    PaginationType<PaymentListType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: PaymentsQueryKey(params),
        queryFn: ({ signal }) => PaymentsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};