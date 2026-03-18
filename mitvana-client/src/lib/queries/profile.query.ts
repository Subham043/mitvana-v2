import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getProfileServerFunc } from "@/lib/server_functions/account.server_function";
import { apiResolver } from "../utils";


export const ProfileQueryKey = () => {
    return ["profile"]
};

export const ProfileQueryFn = async () => {
    const response = await apiResolver(getProfileServerFunc());
    return response.data;
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