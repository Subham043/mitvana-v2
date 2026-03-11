import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import type { PaginationType, PincodeType } from "@/utils/types";
import { PincodeQueryKey, PincodesQueryKey } from "../query/pincode";
import type { PincodeFormValuesType, PincodeStatusFormValuesType } from "../schema/pincode";
import { createPincodeHandler, deletePincodeHandler, getPincodesExportHandler, togglePincodeStatusHandler, updatePincodeHandler } from "../dal/pincodes";
import { useSearchParams } from "react-router";

export const usePincodeCreateMutation = () => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();

    return useMutation({
        mutationFn: async (val: PincodeFormValuesType) => {
            nprogress.start()
            return await createPincodeHandler(val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Pincode created successfully");
            if (page === 1 && !search) {
                context.client.setQueryData(PincodesQueryKey(params), (oldData: PaginationType<PincodeType> | undefined) => {
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
                context.client.invalidateQueries({ queryKey: PincodesQueryKey(params) });
            }
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const usePincodeUpdateMutation = (id: string) => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async (val: PincodeFormValuesType) => {
            nprogress.start()
            return await updatePincodeHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Pincode updated successfully");
            context.client.setQueryData(PincodesQueryKey(params), (oldData: PaginationType<PincodeType> | undefined) => {
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
            context.client.setQueryData(PincodeQueryKey(id, true), data);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const usePincodeDeleteMutation = (id: string) => {
    const { toastSuccess, toastError } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await deletePincodeHandler(id);
        },
        onSuccess: (_, __, ___, context) => {
            toastSuccess("Pincode deleted successfully");
            context.client.invalidateQueries({ queryKey: PincodesQueryKey(params) });
            context.client.setQueryData(PincodeQueryKey(id), undefined);
            context.client.setQueryData(PincodeQueryKey(id, true), undefined);
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const usePincodeToggleStatusMutation = (id: string) => {
    const { toastSuccess, toastError } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async (val: PincodeStatusFormValuesType) => {
            nprogress.start()
            return await togglePincodeStatusHandler(id, val);
        },
        onSuccess: (_, dataParams, ___, context) => {
            toastSuccess("Pincode status toggled successfully");
            context.client.setQueryData(PincodesQueryKey(params), (oldData: PaginationType<PincodeType> | undefined) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    data: oldData.data.map((user) => user.id === id ? { ...user, is_delivery_available: dataParams.is_delivery_available } : user),
                };
            });
            context.client.setQueryData(PincodeQueryKey(id), (oldData: PincodeType | undefined) => {
                if (!oldData) return oldData;
                return { ...oldData, is_delivery_available: dataParams.is_delivery_available };
            });
            context.client.setQueryData(PincodeQueryKey(id, true), (oldData: PincodeType | undefined) => {
                if (!oldData) return oldData;
                return { ...oldData, is_delivery_available: dataParams.is_delivery_available };
            });
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const usePincodesExportMutation = () => {
    const { toastSuccess, toastError } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await getPincodesExportHandler(params);
        },
        onSuccess: (data) => {
            toastSuccess("Pincodes exported successfully");
            const url = window.URL.createObjectURL(data);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "pincodes.xlsx");
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};