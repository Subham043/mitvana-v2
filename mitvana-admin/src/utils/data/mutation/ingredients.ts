import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import type { IngredientType, PaginationType } from "@/utils/types";
import { useSearchParams } from "react-router";
import type { IngredientFormValuesType } from "../schema/ingredient";
import { createIngredientHandler, deleteIngredientHandler, updateIngredientHandler } from "../dal/ingredients";
import { IngredientsQueryKey, IngredientQueryKey } from "../query/ingredient";

export const useIngredientCreateMutation = () => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();

    return useMutation({
        mutationFn: async (val: IngredientFormValuesType) => {
            nprogress.start()
            return await createIngredientHandler(val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Ingredient created successfully");
            if (page === 1 && !search) {
                context.client.setQueryData(IngredientsQueryKey(params), (oldData: PaginationType<IngredientType> | undefined) => {
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
                context.client.invalidateQueries({ queryKey: IngredientsQueryKey(params) });
            }
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useIngredientUpdateMutation = (id: string) => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async (val: IngredientFormValuesType) => {
            nprogress.start()
            return await updateIngredientHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Ingredient updated successfully");
            context.client.setQueryData(IngredientsQueryKey(params), (oldData: PaginationType<IngredientType> | undefined) => {
                if (!oldData) return oldData;
                const oldUserDataIndex = oldData.data.findIndex((user) => user.id === id);
                if (oldUserDataIndex !== -1) {
                    const newData = [...oldData.data];
                    newData[oldUserDataIndex] = {
                        ...data,
                        thumbnail_link: `${data.thumbnail_link}?v=${new Date(data.updatedAt).getTime()}`,
                    };
                    return {
                        ...oldData,
                        data: newData,
                    };
                }
                return oldData;
            });
            context.client.setQueryData(IngredientQueryKey(id), data);
            context.client.setQueryData(IngredientQueryKey(id, true), data);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useIngredientDeleteMutation = (id: string) => {
    const { toastSuccess, toastError } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await deleteIngredientHandler(id);
        },
        onSuccess: (_, __, ___, context) => {
            toastSuccess("Ingredient deleted successfully");
            context.client.invalidateQueries({ queryKey: IngredientsQueryKey(params) });
            context.client.setQueryData(IngredientQueryKey(id), undefined);
            context.client.setQueryData(IngredientQueryKey(id, true), undefined);
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};