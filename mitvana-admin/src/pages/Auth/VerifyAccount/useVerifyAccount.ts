import { useLogoutMutation, useResendVerificationCodeMutation } from "@/utils/data/mutation/profile";
import { useCallback } from "react";

export function useVerifyAccount() {
    const resendVerification = useResendVerificationCodeMutation()
    const logout = useLogoutMutation()

    const onResendVerificationLink = useCallback(() => resendVerification.mutate(), [resendVerification])
    const onLogoutHandler = useCallback(() => logout.mutate(), [logout])

    return {
        loading: resendVerification.isPending,
        logoutLoading: logout.isPending,
        onResendVerificationLink,
        onLogoutHandler
    };
}