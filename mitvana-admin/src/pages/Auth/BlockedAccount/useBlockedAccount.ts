import { useLogoutMutation } from "@/utils/data/mutation/profile";
import { useCallback } from "react";

export function useBlockedAccount() {
    const logout = useLogoutMutation();

    const onLogoutHandler = useCallback(
        async () => await logout.mutateAsync(),
        [logout.mutateAsync],
    );

    return {
        logoutLoading: logout.isPending,
        onLogoutHandler,
    };
}