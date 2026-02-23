import { useMutation } from "@tanstack/react-query";
import type { ForgotPasswordFormValuesType, LoginFormValuesType, RegisterFormValuesType, ResetPasswordFormValuesType } from "@/lib/schemas/auth.schema";
import { forgotPasswordServerFunc, loginServerFunc, registerServerFunc, resetPasswordServerFunc } from "@/lib/server_functions/auth.server_function";
import { toastSuccess } from "@/hooks/useToast";


export const useLoginMutation = () => {
    return useMutation({
        mutationFn: async (val: LoginFormValuesType) => {
            return await loginServerFunc({ data: val });
        },
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: () => {
            // const { access_token, refresh_token, ...user } = data;
            // setAuth(user, access_token);
            // context.client.setQueryData(ProfileQueryKey(), user);
            toastSuccess("Logged in successfully");
        },
        // onSettled: () => {
        //     nprogress.complete();
        // }
    });
};

export const useForgotPasswordMutation = () => {
    return useMutation({
        mutationFn: async (val: ForgotPasswordFormValuesType) => {
            return await forgotPasswordServerFunc({ data: val });
        },
        onSuccess: (data) => {
            toastSuccess(data.message);
        }
    });
};

export const useResetPasswordMutation = () => {
    return useMutation({
        mutationFn: async (val: ResetPasswordFormValuesType) => {
            return await resetPasswordServerFunc({ data: val });
        },
        onSuccess: (data) => {
            toastSuccess(data.message);
        }
    });
};

export const useRegisterMutation = () => {
    return useMutation({
        mutationFn: async (val: RegisterFormValuesType) => {
            return await registerServerFunc({ data: val });
        },
        onSuccess: () => {
            toastSuccess("Registered successfully");
        }
    });
};