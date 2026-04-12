import { useToast } from "@/hooks/useToast";
import { useAuthStore } from "@/lib/store/auth.store";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordHandler, loginHandler, registerHandler, resetPasswordHandler } from "../dal/auth";
import type { LoginFormValuesType, RegisterFormValuesType } from "@/lib/data/schemas/auth";
import type { ForgotPasswordFormValuesType } from "@/lib/data/schemas/auth";
import type { ResetPasswordFormValuesType } from "@/lib/data/schemas/auth";
import { ProfileQueryKey } from "../queries/profile";


export const useLoginMutation = () => {
    const setAuth = useAuthStore((state) => state.setAuth)
    const { toastSuccess } = useToast();
    return useMutation({
        mutationFn: async (val: LoginFormValuesType) => {
            return await loginHandler(val);
        },
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: (data, _, __, context) => {
            const { access_token, refresh_token, ...user } = data;
            setAuth(user, access_token);
            context.client.setQueryData(ProfileQueryKey(), user);
            toastSuccess("Logged in successfully");
        },
    });
};

export const useRegisterMutation = () => {
    const setAuth = useAuthStore((state) => state.setAuth)
    const { toastInfo } = useToast();
    return useMutation({
        mutationFn: async (val: RegisterFormValuesType) => {
            return await registerHandler(val);
        },
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: (data, _, __, context) => {
            const { access_token, refresh_token, ...user } = data;
            setAuth(user, access_token);
            context.client.setQueryData(ProfileQueryKey(), user);
            toastInfo("We have sent you an email to verify your account.");
        },
    });
};

export const useForgotPasswordMutation = () => {
    const { toastInfo } = useToast();
    return useMutation({
        mutationFn: async (val: ForgotPasswordFormValuesType) => {
            await forgotPasswordHandler(val);
        },
        onSuccess: () => {
            toastInfo("We have sent you an email to reset your password.");
        }
    });
};

export const useResetPasswordMutation = () => {
    const { toastSuccess } = useToast();
    return useMutation({
        mutationFn: async (val: ResetPasswordFormValuesType & { token: string }) => {
            const { token, ...data } = val;
            await resetPasswordHandler(token, data);
        },
        onSuccess: () => {
            toastSuccess("Password updated successfully.");
        },
    });
};