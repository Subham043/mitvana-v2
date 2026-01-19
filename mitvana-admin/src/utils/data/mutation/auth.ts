import { useToast } from "@/hooks/useToast";
import { useAuthStore } from "@/stores/auth.store";
import { nprogress } from "@mantine/nprogress";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordHandler, loginHandler, resetPasswordHandler } from "../dal/auth";
import type { LoginFormValuesType } from "@/utils/data/schema/auth";
import type { ForgotPasswordFormValuesType } from "@/utils/data/schema/auth";
import type { ResetPasswordFormValuesType } from "@/utils/data/schema/auth";
import { ProfileQueryKey } from "../query/profile";


export const useLoginMutation = () => {
    const setAuth = useAuthStore((state) => state.setAuth)
    const { toastSuccess } = useToast();
    return useMutation({
        mutationFn: async (val: LoginFormValuesType) => {
            nprogress.start()
            return await loginHandler(val);
        },
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: (data, _, __, context) => {
            const { access_token, refresh_token, ...user } = data;
            setAuth(user, access_token);
            context.client.setQueryData(ProfileQueryKey(), user);
            toastSuccess("Logged in successfully");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useForgotPasswordMutation = () => {
    const { toastInfo } = useToast();
    return useMutation({
        mutationFn: async (val: ForgotPasswordFormValuesType) => {
            nprogress.start()
            await forgotPasswordHandler(val);
        },
        onSuccess: () => {
            toastInfo("We have sent you an email to reset your password.");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useResetPasswordMutation = () => {
    const { toastSuccess } = useToast();
    return useMutation({
        mutationFn: async (val: ResetPasswordFormValuesType & { token: string }) => {
            nprogress.start()
            const { token, ...data } = val;
            await resetPasswordHandler(token, data);
        },
        onSuccess: () => {
            toastSuccess("Password updated successfully.");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};