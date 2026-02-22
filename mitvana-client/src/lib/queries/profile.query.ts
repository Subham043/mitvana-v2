// import { useAuthStore } from "@/stores/auth.store";
// import type { ProfileType } from "@/utils/types";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getProfileServerFunc } from "@/lib/server_functions/account.server_function";


export const ProfileQueryKey = (
    // isEdit: boolean = false
) => {
    // if (isEdit) {
    //     return ["profile", useAuthStore.getState().authToken, "edit"]
    // }
    // return ["profile", useAuthStore.getState().authToken, "view"]
    return ["profile"]
};

export const ProfileQueryFn = async () => {
    // const authToken = useAuthStore.getState().authToken
    // const setAuthUser = useAuthStore.getState().setAuthUser
    // if (!authToken) {
    //     return undefined;
    // }
    const response = await getProfileServerFunc();
    // setAuthUser(response);
    return response;
}

// export const ProfileQueryOptions = {
//     queryKey: ProfileQueryKey(),
//     queryFn: ProfileQueryFn,
// }

export const profileQueryOptions = () => ({
    queryKey: ["profile"],
    queryFn: () => ProfileQueryFn(),
})

/*
  Profile Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useProfileQuery = () => {
    // const authToken = useAuthStore((state) => state.authToken)

    return useQuery({
        ...profileQueryOptions(),
        // enabled: authToken !== null,
    });
};

export const useSuspenseProfileQuery = () => {
    // const authToken = useAuthStore((state) => state.authToken)

    return useSuspenseQuery({
        ...profileQueryOptions(),
        // enabled: authToken !== null,
    });
};