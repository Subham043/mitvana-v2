import { useAuthStore } from "@/stores/auth.store";
import type { PaginationType, TagType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getTagHandler, getTagsHandler } from "../dal/tags";
import { useSearchParams } from "react-router";


export const TagQueryKey = (id: string, isEdit: boolean = false) => {
    if (isEdit) {
        return ["tag", id, "edit"]
    }
    return ["tag", id, "view"]
};

export const TagsQueryKey = (params: URLSearchParams) => {
    return ["tags", params.toString()]
};

export const TagQueryFn = async ({ id, signal }: { id: string, signal?: AbortSignal }) => {
    return await getTagHandler(id, signal);
}

export const TagsQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getTagsHandler(params, signal);
}

/*
  Tag Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useTagQuery: (id: string, enabled: boolean) => UseQueryResult<
    TagType | undefined,
    unknown
> = (id, enabled) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: TagQueryKey(id),
        queryFn: ({ signal }) => TagQueryFn({ id, signal }),
        enabled: authToken !== null && enabled,
    });
};

/*
  Tags Query Hook Function: This hook is used to fetch information of all the tags
*/
export const useTagsQuery: () => UseQueryResult<
    PaginationType<TagType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const [params] = useSearchParams();

    return useQuery({
        queryKey: TagsQueryKey(params),
        queryFn: ({ signal }) => TagsQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};