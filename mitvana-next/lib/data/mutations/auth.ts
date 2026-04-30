import { useToast } from "@/hooks/useToast";
import { useAuthStore } from "@/lib/store/auth.store";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordHandler, loginHandler, registerHandler, resetPasswordHandler } from "../dal/auth";
import type { LoginFormValuesType, RegisterFormValuesType } from "@/lib/data/schemas/auth";
import type { ForgotPasswordFormValuesType } from "@/lib/data/schemas/auth";
import type { ResetPasswordFormValuesType } from "@/lib/data/schemas/auth";
import { ProfileQueryKey } from "../queries/profile";
import { ProfileType } from "@/lib/types";
import { useSyncCartMutation } from "./cart";


export const useLoginMutation = () => {
    const { toastSuccess } = useToast();
    const syncCartMutation = useSyncCartMutation();
    return useMutation({
        mutationFn: async (val: LoginFormValuesType) => {
            const res = await loginHandler(val);
            const { access_token, ...user } = res;
            useAuthStore.getState().setAuth(user, access_token);
            return res;
        },
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: async (data, _, __, context) => {
            const { access_token, ...user } = data;
            context.client.setQueryData(ProfileQueryKey(), (prev: ProfileType | undefined) => {
                if (!prev) return user;
                return { ...prev, ...user }
            });
            context.client.setQueryData(ProfileQueryKey(true), (prev: ProfileType | undefined) => {
                if (!prev) return user;
                return { ...prev, ...user }
            });
            toastSuccess("Logged in successfully");
            if (data.is_verified) {
                syncCartMutation.mutateAsync();
            }
        },
    });
};

export const useRegisterMutation = () => {
    const { toastInfo } = useToast();
    return useMutation({
        mutationFn: async (val: RegisterFormValuesType) => {
            return await registerHandler(val);
        },
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: (data, _, __, context) => {
            const { access_token, refresh_token, ...user } = data;
            useAuthStore.getState().setAuth(user, access_token);
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