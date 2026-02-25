import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getProfileServerFunc } from "@/lib/server_functions/account.server_function";


export const ProfileQueryKey = () => {
    return ["profile"]
};

export const ProfileQueryFn = async () => {
    const response = await getProfileServerFunc();
    return response;
}

export const profileQueryOptions = () => ({
    queryKey: ProfileQueryKey(),
    queryFn: () => ProfileQueryFn(),
})

/*
  Profile Query Hook Function: This hook is used to fetch information of the logged in user
*/
export const useProfileQuery = () => {
    return useQuery({
        ...profileQueryOptions(),
    });
};

export const useSuspenseProfileQuery = () => {

    return useSuspenseQuery({
        ...profileQueryOptions(),
    });
};