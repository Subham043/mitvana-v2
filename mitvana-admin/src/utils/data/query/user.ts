import { useAuthStore } from "@/stores/auth.store";
import type { PaginationQueryType, PaginationType, UserType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getUserHandler, getUsersHandler } from "../dal/users";
import { usePaginationQueryParam } from "@/hooks/usePaginationQueryParam";
import { useSearchQueryParam } from "@/hooks/useSearchQueryParam";


export const UserQueryKey = (id: string) => {
    return ["user", id]
};

export const UsersQueryKey = (query: PaginationQueryType) => {
    const { page = 1, limit = 10, search = "" } = query;
    return ["users", page, limit, search]
};

export const UserQueryFn = async ({ id, signal }: { id: string, signal?: AbortSignal }) => {
    return await getUserHandler(id, signal);
}

export const UsersQueryFn = async ({ query, signal }: { query: PaginationQueryType, signal?: AbortSignal }) => {
    return await getUsersHandler(query, signal);
}

/*
  User Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useUserQuery: (id: string, enabled: boolean) => UseQueryResult<
    UserType | undefined,
    unknown
> = (id, enabled) => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: UserQueryKey(id),
        queryFn: () => UserQueryFn({ id }),
        enabled: authToken !== null && enabled,
    });
};

/*
  Users Query Hook Function: This hook is used to fetch information of all the users
*/
export const useUsersQuery: () => UseQueryResult<
    PaginationType<UserType> | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)
    const { page, limit } = usePaginationQueryParam();
    const { search } = useSearchQueryParam();
    const query: PaginationQueryType = { page, limit, search };

    return useQuery({
        queryKey: UsersQueryKey(query),
        queryFn: () => UsersQueryFn({ query }),
        enabled: authToken !== null,
    });
};