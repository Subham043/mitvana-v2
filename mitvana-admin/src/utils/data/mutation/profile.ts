import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { nprogress } from "@mantine/nprogress";
import { useAuthStore } from "@/stores/auth.store";
import { ProfileQueryKey } from "../query/profile";
import type { ProfileUpdateFormValuesType } from "@/utils/data/schema/profile";
import type { PasswordUpdateFormValuesType } from "@/utils/data/schema/profile";
import type { VerifyAccountFormValuesType } from "@/utils/data/schema/profile";
import { changePasswordHandler, resendVerificationCodeHandler, updateProfileHandler, verifyProfileHandler } from "../dal/profile";


export const useProfileUpdateMutation = () => {
    const { toastSuccess } = useToast();
    const setAuthUser = useAuthStore((state) => state.setAuthUser)
    return useMutation({
        mutationFn: async (val: ProfileUpdateFormValuesType) => {
            nprogress.start()
            return await updateProfileHandler(val);
        },
        onSuccess: (data, _, __, context) => {
            toastSuccess("Profile updated successfully");
            context.client.setQueryData(ProfileQueryKey(), data);
            setAuthUser(data)
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
            toastInfo("We have sent you an email containing a verification code. Please use that code to verify your account.");
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
    const authUser = useAuthStore((state) => state.authUser)
    const setAuthUser = useAuthStore((state) => state.setAuthUser)
    const { toastSuccess } = useToast();
    return useMutation({
        mutationFn: async (val: VerifyAccountFormValuesType) => {
            nprogress.start()
            await verifyProfileHandler(val);
        },
        onSuccess: (_, __, ___, context) => {
            toastSuccess("Profile verified successfully");
            if (authUser) {
                const updatedAuthUser = { ...authUser, is_verified: true };
                context.client.setQueryData(ProfileQueryKey(), updatedAuthUser);
                setAuthUser(updatedAuthUser)
            }
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