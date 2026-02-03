import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import type { PaginationType, TagType } from "@/utils/types";
import { TagQueryKey, TagsQueryKey } from "../query/tag";
import type { TagFormValuesType } from "../schema/tag";
import { createTagHandler, deleteTagHandler, updateTagHandler } from "../dal/tags";
import { useSearchParams } from "react-router";

export const useTagCreateMutation = () => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();

    return useMutation({
        mutationFn: async (val: TagFormValuesType) => {
            nprogress.start()
            return await createTagHandler(val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Tag created successfully");
            if (page === 1 && !search) {
                context.client.setQueryData(TagsQueryKey(params), (oldData: PaginationType<TagType> | undefined) => {
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
                context.client.invalidateQueries({ queryKey: TagsQueryKey(params) });
            }
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useTagUpdateMutation = (id: string) => {
    const { toastSuccess } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async (val: TagFormValuesType) => {
            nprogress.start()
            return await updateTagHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Tag updated successfully");
            context.client.setQueryData(TagsQueryKey(params), (oldData: PaginationType<TagType> | undefined) => {
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
            context.client.setQueryData(TagQueryKey(id), data);
            context.client.setQueryData(TagQueryKey(id, true), data);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useTagDeleteMutation = (id: string) => {
    const { toastSuccess, toastError } = useToast();
    const [params] = useSearchParams();

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await deleteTagHandler(id);
        },
        onSuccess: (_, __, ___, context) => {
            toastSuccess("Tag deleted successfully");
            context.client.invalidateQueries({ queryKey: TagsQueryKey(params) });
            context.client.setQueryData(TagQueryKey(id), undefined);
            context.client.setQueryData(TagQueryKey(id, true), undefined);
        },
        onError: (error: any) => {
            toastError(error?.response?.data?.message || "Something went wrong, please try again later.");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};