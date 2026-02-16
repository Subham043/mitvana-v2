import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import type { PaginationType, OfferType } from "@/utils/types";
import { OfferQueryKey, OffersQueryKey } from "../query/offer";
import type { OfferFormValuesType } from "../schema/offer";
import { createOfferHandler, deleteOfferHandler, updateOfferHandler } from "../dal/offers";
import { useSearchParams } from "react-router";

export const useOfferCreateMutation = () => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();

    return useMutation({
        mutationFn: async (val: OfferFormValuesType) => {
            nprogress.start()
            return await createOfferHandler(val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Offer created successfully");
            if (page === 1 && !search) {
                context.client.setQueryData(OffersQueryKey(params), (oldData: PaginationType<OfferType> | undefined) => {
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
                context.client.invalidateQueries({ queryKey: OffersQueryKey(params) });
            }
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useOfferUpdateMutation = (id: string) => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async (val: OfferFormValuesType) => {
            nprogress.start()
            return await updateOfferHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Offer updated successfully");
            context.client.setQueryData(OffersQueryKey(params), (oldData: PaginationType<OfferType> | undefined) => {
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
            context.client.setQueryData(OfferQueryKey(id), data);
            context.client.setQueryData(OfferQueryKey(id, true), data);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useOfferDeleteMutation = (id: string) => {
    const { toastSuccess, toastError } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await deleteOfferHandler(id);
        },
        onSuccess: (_, __, ___, context) => {
            toastSuccess("Offer deleted successfully");
            context.client.invalidateQueries({ queryKey: OffersQueryKey(params) });
            context.client.setQueryData(OfferQueryKey(id), undefined);
            context.client.setQueryData(OfferQueryKey(id, true), undefined);
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};