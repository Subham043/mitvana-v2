import { useAuthStore } from "@/stores/auth.store";
import type { ProfileType } from "@/utils/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getProfileHandler } from "../dal/profile";


export const ProfileQueryKey = (isEdit: boolean = false) => {
    if (isEdit) {
        return ["profile", useAuthStore.getState().authToken, "edit"]
    }
    return ["profile", useAuthStore.getState().authToken, "view"]
};

export const ProfileQueryFn = async ({ signal }: { signal?: AbortSignal }) => {
    const authToken = useAuthStore.getState().authToken
    const setAuthUser = useAuthStore.getState().setAuthUser
    if (!authToken) {
        return undefined;
    }
    const response = await getProfileHandler(signal);
    setAuthUser(response);
    return response;
}

/*
  Profile Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useProfileQuery: () => UseQueryResult<
    ProfileType | undefined,
    unknown
> = () => {
    const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        queryKey: ProfileQueryKey(),
        queryFn: ({ signal }) => ProfileQueryFn({ signal }),
        enabled: authToken !== null,
    });
};