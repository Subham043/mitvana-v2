import { useMutation } from "@tanstack/react-query";
import type { LoginFormValuesType } from "@/lib/schemas/auth.schema";
import { loginServerFunc } from "@/lib/server_functions/auth.server_function";


export const useLoginMutation = () => {
    return useMutation({
        mutationFn: async (val: LoginFormValuesType) => {
            return await loginServerFunc({ data: val });
        },
        // 💡 response of the mutation is passed to onSuccess
        // onSuccess: (data, _, __, context) => {
        //     const { access_token, refresh_token, ...user } = data;
        //     setAuth(user, access_token);
        //     context.client.setQueryData(ProfileQueryKey(), user);
        //     toastSuccess("Logged in successfully");
        // },
        // onSettled: () => {
        //     nprogress.complete();
        // }
    });
};