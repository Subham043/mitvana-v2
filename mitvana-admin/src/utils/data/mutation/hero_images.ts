import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import type { HeroImageType, PaginationType } from "@/utils/types";
import { useSearchParams } from "react-router";
import type { HeroImageFormValuesType } from "../schema/hero_image";
import { createHeroImageHandler, deleteHeroImageHandler, updateHeroImageHandler } from "../dal/hero_images";
import { HeroImagesQueryKey, HeroImageQueryKey } from "../query/hero_image";

export const useHeroImageCreateMutation = () => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();

    return useMutation({
        mutationFn: async (val: HeroImageFormValuesType) => {
            nprogress.start()
            return await createHeroImageHandler(val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Hero Image created successfully");
            if (page === 1 && !search) {
                context.client.setQueryData(HeroImagesQueryKey(params), (oldData: PaginationType<HeroImageType> | undefined) => {
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
                context.client.invalidateQueries({ queryKey: HeroImagesQueryKey(params) });
            }
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useHeroImageUpdateMutation = (id: string) => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async (val: HeroImageFormValuesType) => {
            nprogress.start()
            return await updateHeroImageHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Hero Image updated successfully");
            context.client.setQueryData(HeroImagesQueryKey(params), (oldData: PaginationType<HeroImageType> | undefined) => {
                if (!oldData) return oldData;
                const oldUserDataIndex = oldData.data.findIndex((user) => user.id === id);
                if (oldUserDataIndex !== -1) {
                    const newData = [...oldData.data];
                    newData[oldUserDataIndex] = {
                        ...data,
                        image_link: `${data.image_link}?v=${new Date(data.updatedAt).getTime()}`,
                    };
                    return {
                        ...oldData,
                        data: newData,
                    };
                }
                return oldData;
            });
            context.client.setQueryData(HeroImageQueryKey(id), data);
            context.client.setQueryData(HeroImageQueryKey(id, true), data);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useHeroImageDeleteMutation = (id: string) => {
    const { toastSuccess, toastError } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await deleteHeroImageHandler(id);
        },
        onSuccess: (_, __, ___, context) => {
            toastSuccess("Hero Image deleted successfully");
            context.client.invalidateQueries({ queryKey: HeroImagesQueryKey(params) });
            context.client.setQueryData(HeroImageQueryKey(id), undefined);
            context.client.setQueryData(HeroImageQueryKey(id, true), undefined);
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};