import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { changePasswordHandler, resendVerificationCodeHandler, updateProfileHandler, verifyProfileHandler } from "../dal/profile";
import { nprogress } from "@mantine/nprogress";
import { useAuthStore } from "@/stores/auth.store";
import type { ProfileUpdateFormValuesType } from "@/pages/Profile/Account/schema";
import type { PasswordUpdateFormValuesType } from "@/pages/Profile/Password/schema";
import { ProfileQueryKey } from "../query/profile";


export const useProfileUpdateMutation = () => {
    const { toastSuccess } = useToast();
    const setAuthUser = useAuthStore((state) => state.setAuthUser)
    //   const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (val: ProfileUpdateFormValuesType, context) => {
            nprogress.start()
            const data = await updateProfileHandler(val);
            context.client.setQueryData(ProfileQueryKey(), data);
            setAuthUser(data)
        },
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: () => {
            toastSuccess("Profile updated successfully");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const usePasswordUpdateMutation = () => {
    const { toastSuccess } = useToast();
    return useMutation({
        mutationFn: async (val: PasswordUpdateFormValuesType) => {
            nprogress.start()
            await changePasswordHandler(val);
        },
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: () => {
            toastSuccess("Password updated successfully");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useResendVerificationCodeMutation = () => {
    const { toastInfo, toastError } = useToast();
    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            await resendVerificationCodeHandler();
        },
        onSuccess: () => {
            toastInfo("We have sent you an email containing a link to verify your account.");
        },
        onError: () => {
            toastError("Failed to send verification code");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useVerifyProfileMutation = () => {
    const { toastSuccess } = useToast();
    return useMutation({
        mutationFn: async (val: { code: string }) => {
            nprogress.start()
            await verifyProfileHandler(val);
        },
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: () => {
            toastSuccess("Profile verified successfully");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};

export const useLogoutMutation = () => {
    const logout = useAuthStore((state) => state.logout)
    const { toastSuccess, toastError } = useToast();
    return useMutation({
        mutationFn: async () => {
            nprogress.start()
            await logout();
        },
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: () => {
            toastSuccess("Logged out successfully");
        },
        onError: () => {
            toastError("Failed to log out");
        },
        onSettled: () => {
            nprogress.complete();
        }
    });
};