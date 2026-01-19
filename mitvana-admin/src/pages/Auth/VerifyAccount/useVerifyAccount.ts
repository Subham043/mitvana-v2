import { useLogoutMutation, useResendVerificationCodeMutation, useVerifyProfileMutation } from "@/utils/data/mutation/profile";
import { useCallback } from "react";
import { useRef } from "react";
import { ReCAPTCHA } from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { handleFormServerErrors } from "@/utils/helper";
import { useNavigate } from "react-router";
import { page_routes } from "@/utils/routes/page_routes";
import { verifyAccountSchema, type VerifyAccountFormValuesType } from "@/utils/data/schema/profile";

export function useVerifyAccount() {
    const captchaRef = useRef<ReCAPTCHA>(null);
    const navigate = useNavigate();
    const verifyAccount = useVerifyProfileMutation()
    const resendVerification = useResendVerificationCodeMutation()
    const logout = useLogoutMutation()

    const form = useForm<VerifyAccountFormValuesType>({
        resolver: yupResolver(verifyAccountSchema),
        defaultValues: { verification_code: "", captcha: "" },
    });

    const onResendVerificationLink = useCallback(() => resendVerification.mutate(), [resendVerification]);
    const onLogoutHandler = useCallback(() => logout.mutate(), [logout]);

    const onSubmit = useCallback(
        form.handleSubmit((values) => {
            verifyAccount.mutate(values, {
                onError: (error) => {
                    form.resetField("captcha")
                    handleFormServerErrors(error, form);
                },
                onSuccess: () => {
                    form.reset({
                        verification_code: "",
                        captcha: ""
                    });
                    navigate(page_routes.dashboard.link, { replace: true });
                },
                onSettled: () => {
                    captchaRef.current?.reset();
                },
            });
        }),
        [form.handleSubmit, verifyAccount.mutate]
    );

    return {
        form,
        verifyAccountLoading: verifyAccount.isPending,
        captchaRef,
        onSubmit,
        resendVerificationLoading: resendVerification.isPending,
        logoutLoading: logout.isPending,
        onResendVerificationLink,
        onLogoutHandler
    };
}