import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import type { PaginationQueryType, PaginationType, PincodeType } from "@/utils/types";
import { PincodeQueryKey, PincodesQueryKey } from "../query/pincode";
import type { PincodeFormValuesType } from "../schema/pincode";
import { createPincodeHandler, deletePincodeHandler, updatePincodeHandler } from "../dal/pincodes";

export const usePincodeCreateMutation = () => {
    const { toastSuccess } = useToast();
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, limit, search };

    return useMutation({
        mutationFn: async (val: PincodeFormValuesType) => {
            nprogress.start()
            return await createPincodeHandler(val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Pincode created successfully");
            if (page === 1 && !search) {
                context.client.setQueryData(PincodesQueryKey(query), (oldData: PaginationType<PincodeType> | undefined) => {
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
                context.client.invalidateQueries({ queryKey: PincodesQueryKey(query) });
            }
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const usePincodeUpdateMutation = (id: string) => {
    const { toastSuccess } = useToast();
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, limit, search };

    return useMutation({
        mutationFn: async (val: PincodeFormValuesType) => {
            nprogress.start()
            return await updatePincodeHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Pincode updated successfully");
            context.client.setQueryData(PincodesQueryKey(query), (oldData: PaginationType<PincodeType> | undefined) => {
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
            context.client.setQueryData(PincodeQueryKey(id), data);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const usePincodeDeleteMutation = (id: string) => {
    const { toastSuccess } = useToast();
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, limit, search };

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await deletePincodeHandler(id);
        },
        onSuccess: (_, __, ___, context) => {
            toastSuccess("Pincode deleted successfully");
            context.client.invalidateQueries({ queryKey: PincodesQueryKey(query) });
            context.client.setQueryData(PincodeQueryKey(id), undefined);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};