import { useAuthStore } from "@/lib/store/auth.store";
import type { ProfileType } from "@/lib/types";
import { queryOptions, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getProfileHandler } from "../dal/profile";


export const ProfileQueryKey = (isEdit: boolean = false) => {
    if (isEdit) {
        return [
            "profile",
            useAuthStore.getState().authToken,
            "edit"]
    }
    return [
        "profile",
        useAuthStore.getState().authToken,
        "view"
    ]
};

export const ProfileQueryFn = async ({ signal }: { signal?: AbortSignal }) => {
    if (!useAuthStore.getState().authToken) {
        return undefined;
    }
    const response = await getProfileHandler(signal);
    useAuthStore.getState().setAuthUser(response);
    return response;
}

export const ProfileQueryOptions = (isEdit: boolean = false) => queryOptions({
    queryKey: ProfileQueryKey(isEdit),
    queryFn: ({ signal }) => ProfileQueryFn({ signal }),
});

/*
  Profile Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useProfileQuery: () => UseQueryResult<
    ProfileType | undefined,
    unknown
> = () => {
    return useQuery({
        ...ProfileQueryOptions(),
        enabled: !!useAuthStore.getState().authToken,
    });
};