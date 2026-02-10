import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import type { PaginationType, CouponCodeType } from "@/utils/types";
import { CouponCodeQueryKey, CouponCodesQueryKey } from "../query/coupon_code";
import type { CouponCodeFormValuesType } from "../schema/coupon_code";
import { createCouponCodeHandler, deleteCouponCodeHandler, updateCouponCodeHandler } from "../dal/coupon_codes";
import { useSearchParams } from "react-router";

export const useCouponCodeCreateMutation = () => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();

    return useMutation({
        mutationFn: async (val: CouponCodeFormValuesType) => {
            nprogress.start()
            return await createCouponCodeHandler(val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Coupon Code created successfully");
            if (page === 1 && !search) {
                context.client.setQueryData(CouponCodesQueryKey(params), (oldData: PaginationType<CouponCodeType> | undefined) => {
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
                context.client.invalidateQueries({ queryKey: CouponCodesQueryKey(params) });
            }
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useCouponCodeUpdateMutation = (id: string) => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async (val: CouponCodeFormValuesType) => {
            nprogress.start()
            return await updateCouponCodeHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Coupon Code updated successfully");
            context.client.setQueryData(CouponCodesQueryKey(params), (oldData: PaginationType<CouponCodeType> | undefined) => {
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
            context.client.setQueryData(CouponCodeQueryKey(id), data);
            context.client.setQueryData(CouponCodeQueryKey(id, true), data);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useCouponCodeDeleteMutation = (id: string) => {
    const { toastSuccess, toastError } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await deleteCouponCodeHandler(id);
        },
        onSuccess: (_, __, ___, context) => {
            toastSuccess("Coupon Code deleted successfully");
            context.client.invalidateQueries({ queryKey: CouponCodesQueryKey(params) });
            context.client.setQueryData(CouponCodeQueryKey(id), undefined);
            context.client.setQueryData(CouponCodeQueryKey(id, true), undefined);
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};