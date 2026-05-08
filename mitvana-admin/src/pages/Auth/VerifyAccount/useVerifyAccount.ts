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

    const onResendVerificationLink = useCallback(async () => await resendVerification.mutateAsync(), [resendVerification.mutateAsync]);
    const onLogoutHandler = useCallback(async () => await logout.mutateAsync(), [logout.mutateAsync]);

    const onSubmit = useCallback(
        form.handleSubmit(async (values) => {
            await verifyAccount.mutateAsync(values, {
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
        [form.handleSubmit, verifyAccount.mutateAsync]
    );

    return {
        form,
        captchaRef,
        onSubmit,
        resendVerificationLoading: resendVerification.isPending,
        logoutLoading: logout.isPending,
        onResendVerificationLink,
        onLogoutHandler
    };
}