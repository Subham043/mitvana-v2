import { useLogoutMutation } from "@/utils/data/mutation/profile";
import { useCallback } from "react";

export function useBlockedAccount() {
    const logout = useLogoutMutation()

    const onLogoutHandler = useCallback(() => logout.mutate(), [logout]);

    return {
        logoutLoading: logout.isPending,
        onLogoutHandler
    };
}