import { useAuthStore } from "@/stores/auth.store";
import type { PaginationQueryType, PaginationType, TagType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getTagHandler, getTagsHandler } from "../dal/tags";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";


export const TagQueryKey = (id: string) => {
    return ["tag", id]
};

export const TagsQueryKey = (query: PaginationQueryType) => {
    const { page = 1, limit = 10, search = "" } = query;
    return ["tags", page, limit, search]
};

export const TagQueryFn = async ({ id, signal }: { id: string, signal?: AbortSignal }) => {
    return await getTagHandler(id, signal);
}

export const TagsQueryFn = async ({ query, signal }: { query: PaginationQueryType, signal?: AbortSignal }) => {
    return await getTagsHandler(query, signal);
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
        queryFn: () => TagQueryFn({ id }),
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
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, limit, search };

    return useQuery({
        queryKey: TagsQueryKey(query),
        queryFn: () => TagsQueryFn({ query }),
        enabled: authToken !== null,
    });
};