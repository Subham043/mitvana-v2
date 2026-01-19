import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";
import type { PaginationQueryType, PaginationType, TagType } from "@/utils/types";
import { TagQueryKey, TagsQueryKey } from "../query/tag";
import type { TagFormValuesType } from "../schema/tag";
import { createTagHandler, deleteTagHandler, updateTagHandler } from "../dal/tags";

export const useTagCreateMutation = () => {
    const { toastSuccess } = useToast();
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, limit, search };

    return useMutation({
        mutationFn: async (val: TagFormValuesType) => {
            nprogress.start()
            return await createTagHandler(val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Tag created successfully");
            if (page === 1 && !search) {
                context.client.setQueryData(TagsQueryKey(query), (oldData: PaginationType<TagType> | undefined) => {
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
                context.client.invalidateQueries({ queryKey: TagsQueryKey(query) });
            }
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useTagUpdateMutation = (id: string) => {
    const { toastSuccess } = useToast();
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, limit, search };

    return useMutation({
        mutationFn: async (val: TagFormValuesType) => {
            nprogress.start()
            return await updateTagHandler(id, val);
        },
        onSuccess: (data, __, ___, context) => {
            toastSuccess("Tag updated successfully");
            context.client.setQueryData(TagsQueryKey(query), (oldData: PaginationType<TagType> | undefined) => {
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
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useTagDeleteMutation = (id: string) => {
    const { toastSuccess } = useToast();
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, limit, search };

    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            return await deleteTagHandler(id);
        },
        onSuccess: (_, __, ___, context) => {
            toastSuccess("Tag deleted successfully");
            context.client.invalidateQueries({ queryKey: TagsQueryKey(query) });
            context.client.setQueryData(TagQueryKey(id), undefined);
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};