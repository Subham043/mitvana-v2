import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../stores/auth.store";
import { logoutServerFunc, updatePasswordServerFunc, updateProfileServerFunc } from "../server_functions/account.server_function";
import { toastError, toastSuccess } from "@/hooks/useToast";
import { ProfileQueryKey } from "../queries/profile.query";
import { useRouter } from "@tanstack/react-router";
import type { PasswordUpdateFormValuesType, ProfileUpdateFormValuesType } from "../schemas/account.schema";
import { apiResolver } from "../utils";

export const useProfileUpdateMutation = () => {
    const router = useRouter();
    const setAuthUser = useAuthStore((state) => state.setAuthUser);
    return useMutation({
        mutationFn: async (val: ProfileUpdateFormValuesType) => {
            return await apiResolver(updateProfileServerFunc({ data: val }));
        },
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: async (data, _, __, context) => {
            setAuthUser(data.data);
            context.client.setQueryData(ProfileQueryKey(), data.data);
            toastSuccess("Profile updated successfully");
            await router.invalidate();
        },
        onError: (error) => {
            toastError(error.message);
        }
    });
};

export const usePasswordUpdateMutation = () => {
    return useMutation({
        mutationFn: async (val: PasswordUpdateFormValuesType) => {
            return await apiResolver(updatePasswordServerFunc({ data: val }));
        },
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: async () => {
            toastSuccess("Password updated successfully");
        },
        onError: (error) => {
            toastError(error.message);
        }
    });
};

export const useLogoutMutation = () => {
    const router = useRouter();
    const removeAuth = useAuthStore((state) => state.removeAuth);
    return useMutation({
        mutationFn: async () => {
            return await apiResolver(logoutServerFunc());
        },
        onSuccess: async (data, _, __, context) => {
            if (data) {
                removeAuth();
                context.client.setQueryData(ProfileQueryKey(), null);
                toastSuccess("Logged out successfully");
                await router.invalidate();
            } else {
                toastError("Failed to logout");
            }
        },
        onError: () => {
            toastError("Failed to logout");
        }
    });
};