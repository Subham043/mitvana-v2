import { useMutation } from "@tanstack/react-query";
import type { ForgotPasswordFormValuesType, LoginFormValuesType, RegisterFormValuesType, ResetPasswordFormValuesType } from "@/lib/schemas/auth.schema";
import { forgotPasswordServerFunc, loginServerFunc, registerServerFunc, resetPasswordServerFunc } from "@/lib/server_functions/auth.server_function";
import { toastError, toastSuccess } from "@/hooks/useToast";
import { useAuthStore } from "../stores/auth.store";
import { ProfileQueryKey } from "../queries/profile.query";
import { useRouter } from "@tanstack/react-router";


export const useLoginMutation = () => {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    return useMutation({
        mutationFn: async (val: LoginFormValuesType) => {
            return await loginServerFunc({ data: val });
        },
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: async (data, _, __, context) => {
            setAuth(data.data, data.data.access_token);
            context.client.setQueryData(ProfileQueryKey(), data.data);
            toastSuccess("Logged in successfully");
            await router.invalidate();
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
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    return useMutation({
        mutationFn: async (val: RegisterFormValuesType) => {
            return await registerServerFunc({ data: val });
        },
        onSuccess: async (data, _, __, context) => {
            setAuth(data.data, data.data.access_token);
            context.client.setQueryData(ProfileQueryKey(), data.data);
            toastSuccess("Registered successfully");
            await router.invalidate();
        },
    });
};