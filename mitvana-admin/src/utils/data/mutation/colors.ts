import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import type { PaginationQueryType, PaginationType, ColorType } from "@/utils/types";
import { ColorQueryKey, ColorsQueryKey } from "../query/color";
import type { ColorFormValuesType } from "../schema/color";
import { createColorHandler, deleteColorHandler, updateColorHandler } from "../dal/colors";

export const useColorCreateMutation = () => {
    const { toastSuccess } = useToast();
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, limit, search };

    return useMutation({
        mutationFn: async (val: ColorFormValuesType) => {
            nprogress.start()
            return await createColorHandler(val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Color created successfully");
            if (page === 1 && !search) {
                context.client.setQueryData(ColorsQueryKey(query), (oldData: PaginationType<ColorType> | undefined) => {
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
                context.client.invalidateQueries({ queryKey: ColorsQueryKey(query) });
            }
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useColorUpdateMutation = (id: string) => {
    const { toastSuccess } = useToast();
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, limit, search };

    return useMutation({
        mutationFn: async (val: ColorFormValuesType) => {
            nprogress.start()
            return await updateColorHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Color updated successfully");
            context.client.setQueryData(ColorsQueryKey(query), (oldData: PaginationType<ColorType> | undefined) => {
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
            context.client.setQueryData(ColorQueryKey(id), data);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useColorDeleteMutation = (id: string) => {
    const { toastSuccess } = useToast();
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, limit, search };

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await deleteColorHandler(id);
        },
        onSuccess: (_, __, ___, context) => {
            toastSuccess("Color deleted successfully");
            context.client.invalidateQueries({ queryKey: ColorsQueryKey(query) });
            context.client.setQueryData(ColorQueryKey(id), undefined);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};