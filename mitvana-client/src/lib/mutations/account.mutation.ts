import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../stores/auth.store";
import { logoutServerFunc } from "../server_functions/account.server_function";
import { toastError, toastSuccess } from "@/hooks/useToast";
import { ProfileQueryKey } from "../queries/profile.query";



export const useLogoutMutation = () => {
    const removeAuth = useAuthStore((state) => state.removeAuth);
    return useMutation({
        mutationFn: async () => {
            return await logoutServerFunc();
        },
        onSuccess: (data, _, __, context) => {
            if (data) {
                removeAuth();
                context.client.setQueryData(ProfileQueryKey(), null);
                toastSuccess("Logged out successfully");
            } else {
                toastError("Failed to logout");
            }
        },
        onError: () => {
            toastError("Failed to logout");
        }
    });
};