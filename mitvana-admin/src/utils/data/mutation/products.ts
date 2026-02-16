import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import type { ProductListType, PaginationType } from "@/utils/types";
import { useSearchParams } from "react-router";
import type { ProductFormValuesType } from "../schema/product";
import { createProductHandler, deleteProductHandler, deleteProductImageHandler, updateProductHandler } from "../dal/products";
import { ProductsQueryKey, ProductQueryKey } from "../query/product";

export const useProductCreateMutation = () => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();

    return useMutation({
        mutationFn: async (val: ProductFormValuesType) => {
            nprogress.start()
            return await createProductHandler(val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Product created successfully");
            if (page === 1 && !search) {
                context.client.setQueryData(ProductsQueryKey(params), (oldData: PaginationType<ProductListType> | undefined) => {
                    if (!oldData) return oldData;
                    if (oldData.data.length < limit) {
                        return {
                            ...oldData,
                            data: [
                                {
                                    id: data.id,
                                    title: data.title,
                                    sub_title: data.sub_title,
                                    slug: data.slug,
                                    name: data.name,
                                    hsn: data.hsn,
                                    sku: data.sku,
                                    price: data.price,
                                    discounted_price: data.discounted_price,
                                    stock: data.stock,
                                    tax: data.tax,
                                    description: data.description,
                                    thumbnail: data.thumbnail,
                                    thumbnail_link: data.thumbnail_link,
                                    is_draft: data.is_draft,
                                    createdAt: data.createdAt,
                                    updatedAt: data.updatedAt,
                                },
                                ...oldData.data,
                            ],
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
                            data: [
                                {
                                    id: data.id,
                                    title: data.title,
                                    sub_title: data.sub_title,
                                    slug: data.slug,
                                    name: data.name,
                                    hsn: data.hsn,
                                    sku: data.sku,
                                    price: data.price,
                                    discounted_price: data.discounted_price,
                                    stock: data.stock,
                                    tax: data.tax,
                                    description: data.description,
                                    thumbnail: data.thumbnail,
                                    thumbnail_link: data.thumbnail_link,
                                    is_draft: data.is_draft,
                                    createdAt: data.createdAt,
                                    updatedAt: data.updatedAt,
                                },
                                ...newData,
                            ],
                            meta: {
                                ...oldData.meta,
                                total: oldData.meta.total + 1,
                            },
                        };
                    }
                });
            } else {
                context.client.invalidateQueries({ queryKey: ProductsQueryKey(params) });
            }
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useProductUpdateMutation = (id: string) => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async (val: ProductFormValuesType) => {
            nprogress.start()
            return await updateProductHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Product updated successfully");
            context.client.setQueryData(ProductsQueryKey(params), (oldData: PaginationType<ProductListType> | undefined) => {
                if (!oldData) return oldData;
                const oldUserDataIndex = oldData.data.findIndex((user) => user.id === id);
                if (oldUserDataIndex !== -1) {
                    const newData = [...oldData.data];
                    newData[oldUserDataIndex] = {
                        id: data.id,
                        title: data.title,
                        sub_title: data.sub_title,
                        slug: data.slug,
                        name: data.name,
                        hsn: data.hsn,
                        sku: data.sku,
                        price: data.price,
                        discounted_price: data.discounted_price,
                        stock: data.stock,
                        tax: data.tax,
                        description: data.description,
                        thumbnail: data.thumbnail,
                        thumbnail_link: `${data.thumbnail_link}?v=${new Date(data.updatedAt).getTime()}`,
                        categories: data.categories,
                        is_draft: data.is_draft,
                        createdAt: data.createdAt,
                        updatedAt: data.updatedAt,
                    };
                    return {
                        ...oldData,
                        data: newData,
                    };
                }
                return oldData;
            });
            context.client.setQueryData(ProductQueryKey(id), data);
            context.client.setQueryData(ProductQueryKey(id, true), data);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useProductDeleteMutation = (id: string) => {
    const { toastSuccess, toastError } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await deleteProductHandler(id);
        },
        onSuccess: (_, __, ___, context) => {
            toastSuccess("Product deleted successfully");
            context.client.invalidateQueries({ queryKey: ProductsQueryKey(params) });
            context.client.setQueryData(ProductQueryKey(id), undefined);
            context.client.setQueryData(ProductQueryKey(id, true), undefined);
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useProductImageDeleteMutation = (id: string, imageId: string) => {
    const { toastSuccess, toastError } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await deleteProductImageHandler(id, imageId);
        },
        onSuccess: (_, __, ___, context) => {
            toastSuccess("Product image deleted successfully");
            context.client.invalidateQueries({ queryKey: ProductsQueryKey(params) });
            context.client.invalidateQueries({ queryKey: ProductQueryKey(id) });
            context.client.invalidateQueries({ queryKey: ProductQueryKey(id, true) });
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};