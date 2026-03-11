import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import type { CategoryType, PaginationType } from "@/utils/types";
import { useSearchParams } from "react-router";
import type { CategoryFormValuesType, CategoryStatusFormValuesType } from "../schema/category";
import { createCategoryHandler, deleteCategoryHandler, getCategoriesExportHandler, toggleCategoryStatusHandler, updateCategoryHandler } from "../dal/categories";
import { CategoriesQueryKey, CategoryQueryKey } from "../query/category";

export const useCategoryCreateMutation = () => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();

    return useMutation({
        mutationFn: async (val: CategoryFormValuesType) => {
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
        mutationFn: async (val: CategoryFormValuesType) => {
            nprogress.start()
            return await updateCategoryHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Category updated successfully");
            context.client.setQueryData(CategoriesQueryKey(params), (oldData: PaginationType<CategoryType> | undefined) => {
                if (!oldData) return oldData;
                const oldCategoryDataIndex = oldData.data.findIndex((user) => user.id === id);
                if (oldCategoryDataIndex !== -1) {
                    const newData = [...oldData.data];
                    newData[oldCategoryDataIndex] = {
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

export const useCategoryToggleStatusMutation = (id: string) => {
    const { toastSuccess, toastError } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async (val: CategoryStatusFormValuesType) => {
            nprogress.start()
            return await toggleCategoryStatusHandler(id, val);
        },
        onSuccess: (_, dataParams, ___, context) => {
            toastSuccess("Category status toggled successfully");
            context.client.setQueryData(CategoriesQueryKey(params), (oldData: PaginationType<CategoryType> | undefined) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    data: oldData.data.map((user) => user.id === id ? { ...user, is_visible_in_navigation: dataParams.is_visible_in_navigation } : user),
                };
            });
            context.client.setQueryData(CategoryQueryKey(id), (oldData: CategoryType | undefined) => {
                if (!oldData) return oldData;
                return { ...oldData, is_visible_in_navigation: dataParams.is_visible_in_navigation };
            });
            context.client.setQueryData(CategoryQueryKey(id, true), (oldData: CategoryType | undefined) => {
                if (!oldData) return oldData;
                return { ...oldData, is_visible_in_navigation: dataParams.is_visible_in_navigation };
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

export const useCategoriesExportMutation = () => {
    const { toastSuccess, toastError } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await getCategoriesExportHandler(params);
        },
        onSuccess: (data) => {
            toastSuccess("Categories exported successfully");
            const url = window.URL.createObjectURL(data);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "categories.xlsx");
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