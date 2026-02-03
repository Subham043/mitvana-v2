import { useAuthStore } from "@/stores/auth.store";
import type { PaginationType, UserType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getUserHandler, getUsersHandler } from "../dal/users";
import { useSearchParams } from "react-router";


export const UserQueryKey = (id: string, isEdit: boolean = false) => {
    if (isEdit) {
        return ["user", id, "edit"]
    }
    return ["user", id, "view"]
};

export const UsersQueryKey = (params: URLSearchParams) => {
    return ["users", params.toString()]
};

export const UserQueryFn = async ({ id, signal }: { id: string, signal?: AbortSignal }) => {
    return await getUserHandler(id, signal);
}

export const UsersQueryFn = async ({ params, signal }: { params: URLSearchParams, signal?: AbortSignal }) => {
    return await getUsersHandler(params, signal);
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
        queryFn: ({ signal }) => UserQueryFn({ id, signal }),
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
    const [params] = useSearchParams();

    return useQuery({
        queryKey: UsersQueryKey(params),
        queryFn: ({ signal }) => UsersQueryFn({ params, signal }),
        enabled: authToken !== null,
    });
};