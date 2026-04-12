import { useToast } from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/auth.store";
import type { ProfileUpdateFormValuesType } from "@/lib/data/schemas/profile";
import type { PasswordUpdateFormValuesType } from "@/lib/data/schemas/profile";
import type { VerifyAccountFormValuesType } from "@/lib/data/schemas/profile";
import { changePasswordHandler, resendVerificationCodeHandler, updateProfileHandler, verifyProfileHandler } from "../dal/profile";
import { ProfileQueryKey } from "../queries/profile";


export const useProfileUpdateMutation = () => {
    const { toastSuccess } = useToast();
    const setAuthUser = useAuthStore((state) => state.setAuthUser)
    return useMutation({
        mutationFn: async (val: ProfileUpdateFormValuesType) => {
            return await updateProfileHandler(val);
        },
        onSuccess: (data, _, __, context) => {
            toastSuccess("Profile updated successfully");
            context.client.setQueryData(ProfileQueryKey(), data);
            context.client.setQueryData(ProfileQueryKey(true), data);
            setAuthUser(data)
        },
    });
};

export const usePasswordUpdateMutation = () => {
    const { toastSuccess } = useToast();
    return useMutation({
        mutationFn: async (val: PasswordUpdateFormValuesType) => {
            await changePasswordHandler(val);
        },
        onSuccess: () => {
            toastSuccess("Password updated successfully");
        },
    });
};

export const useResendVerificationCodeMutation = () => {
    const { toastInfo, toastError } = useToast();
    return useMutation({
        mutationFn: async () => {
            await resendVerificationCodeHandler();
        },
        onSuccess: () => {
            toastInfo("We have sent you an email containing a verification code. Please use that code to verify your account.");
        },
        onError: () => {
            toastError("Failed to send verification code");
        },
    });
};

export const useVerifyProfileMutation = () => {
    const authUser = useAuthStore((state) => state.authUser)
    const setAuthUser = useAuthStore((state) => state.setAuthUser)
    const { toastSuccess } = useToast();
    return useMutation({
        mutationFn: async (val: VerifyAccountFormValuesType) => {
            await verifyProfileHandler(val);
        },
        onSuccess: (_, __, ___, context) => {
            toastSuccess("Profile verified successfully");
            if (authUser) {
                const updatedAuthUser = { ...authUser, is_verified: true };
                context.client.setQueryData(ProfileQueryKey(), updatedAuthUser);
                context.client.setQueryData(ProfileQueryKey(true), updatedAuthUser);
                setAuthUser(updatedAuthUser)
            }
        },
    });
};

export const useLogoutMutation = () => {
    const logout = useAuthStore((state) => state.logout)
    const { toastSuccess, toastError } = useToast();
    return useMutation({
        mutationFn: async () => {
            await logout();
        },
        onSuccess: () => {
            toastSuccess("Logged out successfully");
        },
        onError: () => {
            toastError("Failed to log out");
        },
    });
};