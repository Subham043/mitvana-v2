import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import type { CategoryType, PaginationType } from "@/utils/types";
import { useSearchParams } from "react-router";
import type { CategoryCreateFormValuesType, CategoryUpdateFormValuesType } from "../schema/category";
import { createCategoryHandler, deleteCategoryHandler, updateCategoryHandler } from "../dal/categories";
import { CategoriesQueryKey, CategoryQueryKey } from "../query/category";

export const useCategoryCreateMutation = () => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();

    return useMutation({
        mutationFn: async (val: CategoryCreateFormValuesType) => {
            nprogress.start()
            return await createCategoryHandler(val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Category created successfully");
            if (page === 1 && !search) {
                context.client.setQueryData(CategoriesQueryKey(params), (oldData: PaginationType<CategoryType> | undefined) => {
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
                context.client.invalidateQueries({ queryKey: CategoriesQueryKey(params) });
            }
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useCategoryUpdateMutation = (id: string) => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async (val: CategoryUpdateFormValuesType) => {
            nprogress.start()
            return await updateCategoryHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Category updated successfully");
            context.client.setQueryData(CategoriesQueryKey(params), (oldData: PaginationType<CategoryType> | undefined) => {
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
            context.client.setQueryData(CategoryQueryKey(id), data);
            context.client.setQueryData(CategoryQueryKey(id, true), data);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useCategoryDeleteMutation = (id: string) => {
    const { toastSuccess, toastError } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await deleteCategoryHandler(id);
        },
        onSuccess: (_, __, ___, context) => {
            toastSuccess("Category deleted successfully");
            context.client.invalidateQueries({ queryKey: CategoriesQueryKey(params) });
            context.client.setQueryData(CategoryQueryKey(id), undefined);
            context.client.setQueryData(CategoryQueryKey(id, true), undefined);
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};