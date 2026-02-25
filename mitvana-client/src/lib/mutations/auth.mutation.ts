import { useMutation } from "@tanstack/react-query";
import type { ForgotPasswordFormValuesType, LoginFormValuesType, RegisterFormValuesType, ResetPasswordFormValuesType } from "@/lib/schemas/auth.schema";
import { forgotPasswordServerFunc, loginServerFunc, registerServerFunc, resetPasswordServerFunc } from "@/lib/server_functions/auth.server_function";
import { toastError, toastSuccess } from "@/hooks/useToast";
import { useAuthStore } from "../stores/auth.store";
import { ProfileQueryKey } from "../queries/profile.query";


export const useLoginMutation = () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    return useMutation({
        mutationFn: async (val: LoginFormValuesType) => {
            return await loginServerFunc({ data: val });
        },
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: (data, _, __, context) => {
            setAuth(data.user, data.token);
            context.client.setQueryData(ProfileQueryKey(), data.user);
            toastSuccess("Logged in successfully");
        },
        onError: (error) => {
            toastError(error.message);
        }
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
    const setAuth = useAuthStore((state) => state.setAuth);
    return useMutation({
        mutationFn: async (val: RegisterFormValuesType) => {
            return await registerServerFunc({ data: val });
        },
        onSuccess: (data, _, __, context) => {
            setAuth(data.user, data.token);
            context.client.setQueryData(ProfileQueryKey(), data.user);
            toastSuccess("Registered successfully");
        },
    });
};