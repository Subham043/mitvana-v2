import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import type { PaginationQueryType, PaginationType, SubscriptionType } from "@/utils/types";
import { SubscriptionQueryKey, SubscriptionsQueryKey } from "../query/subscription";
import type { SubscriptionFormValuesType } from "../schema/subscription";
import { createSubscriptionHandler, deleteSubscriptionHandler, updateSubscriptionHandler } from "../dal/subscriptions";

export const useSubscriptionCreateMutation = () => {
    const { toastSuccess } = useToast();
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, limit, search };

    return useMutation({
        mutationFn: async (val: SubscriptionFormValuesType) => {
            nprogress.start()
            return await createSubscriptionHandler(val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Subscription created successfully");
            if (page === 1 && !search) {
                context.client.setQueryData(SubscriptionsQueryKey(query), (oldData: PaginationType<SubscriptionType> | undefined) => {
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
                context.client.invalidateQueries({ queryKey: SubscriptionsQueryKey(query) });
            }
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useSubscriptionUpdateMutation = (id: string) => {
    const { toastSuccess } = useToast();
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, limit, search };

    return useMutation({
        mutationFn: async (val: SubscriptionFormValuesType) => {
            nprogress.start()
            return await updateSubscriptionHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Subscription updated successfully");
            context.client.setQueryData(SubscriptionsQueryKey(query), (oldData: PaginationType<SubscriptionType> | undefined) => {
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
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useSubscriptionDeleteMutation = (id: string) => {
    const { toastSuccess } = useToast();
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, limit, search };

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await deleteSubscriptionHandler(id);
        },
        onSuccess: (_, __, ___, context) => {
            toastSuccess("Subscription deleted successfully");
            context.client.invalidateQueries({ queryKey: SubscriptionsQueryKey(query) });
            context.client.setQueryData(SubscriptionQueryKey(id), undefined);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};