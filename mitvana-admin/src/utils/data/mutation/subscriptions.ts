import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import type { PaginationType, SubscriptionType } from "@/utils/types";
import { SubscriptionQueryKey, SubscriptionsQueryKey } from "../query/subscription";
import type { SubscriptionFormValuesType } from "../schema/subscription";
import { createSubscriptionHandler, deleteSubscriptionHandler, updateSubscriptionHandler } from "../dal/subscriptions";
import { useSearchParams } from "react-router";

export const useSubscriptionCreateMutation = () => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();

    return useMutation({
        mutationFn: async (val: SubscriptionFormValuesType) => {
            nprogress.start()
            return await createSubscriptionHandler(val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Subscription created successfully");
            if (page === 1 && !search) {
                context.client.setQueryData(SubscriptionsQueryKey(params), (oldData: PaginationType<SubscriptionType> | undefined) => {
                    if (!oldData) return oldData;
                    if (oldData.data.length < limit) {
                        return {
                            ...oldData,
                            data: [data, ...oldData.data],
                            meta: {
                                ...oldData.meta,
                                total: oldData.meta.total + 1,
                            },
                        };
                    } else {
                        const newData = [...oldData.data];
                        newData.splice(limit - 1, 0, data);
                        return {
                            ...oldData,
                            data: [data, ...newData],
                            meta: {
                                ...oldData.meta,
                                total: oldData.meta.total + 1,
                            },
                        };
                    }
                });
            } else {
                context.client.invalidateQueries({ queryKey: SubscriptionsQueryKey(params) });
            }
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useSubscriptionUpdateMutation = (id: string) => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async (val: SubscriptionFormValuesType) => {
            nprogress.start()
            return await updateSubscriptionHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Subscription updated successfully");
            context.client.setQueryData(SubscriptionsQueryKey(params), (oldData: PaginationType<SubscriptionType> | undefined) => {
                if (!oldData) return oldData;
                const oldUserDataIndex = oldData.data.findIndex((user) => user.id === id);
                if (oldUserDataIndex !== -1) {
                    const newData = [...oldData.data];
                    newData[oldUserDataIndex] = data;
                    return {
                        ...oldData,
                        data: newData,
                    };
                }
                return oldData;
            });
            context.client.setQueryData(SubscriptionQueryKey(id), data);
            context.client.setQueryData(SubscriptionQueryKey(id, true), data);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useSubscriptionDeleteMutation = (id: string) => {
    const { toastSuccess, toastError } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await deleteSubscriptionHandler(id);
        },
        onSuccess: (_, __, ___, context) => {
            toastSuccess("Subscription deleted successfully");
            context.client.invalidateQueries({ queryKey: SubscriptionsQueryKey(params) });
            context.client.setQueryData(SubscriptionQueryKey(id), undefined);
            context.client.setQueryData(SubscriptionQueryKey(id, true), undefined);
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};