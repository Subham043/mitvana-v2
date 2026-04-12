import { useResetPasswordMutation } from "@/lib/data/mutations/auth";
import { ResetPasswordFormValuesType, resetPasswordSchema } from "@/lib/data/schemas/auth";
import { handleFormServerErrors } from "@/lib/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";


export function useResetPassword({ token }: { token: string }) {
    const captchaRef = useRef<ReCAPTCHA>(null);
    const resetPassword = useResetPasswordMutation()
    const router = useRouter()

    const form = useForm<ResetPasswordFormValuesType>({
        resolver: yupResolver(resetPasswordSchema),
        defaultValues: {
            email: "",
            password: "",
            confirm_password: "",
            captcha: "",
        },
        mode: "onChange"
    });

    const onSubmit = useCallback(
        form.handleSubmit((values) => {
            resetPassword.mutate({ ...values, token }, {
                onError: (error) => {
                    form.resetField("captcha")
                    handleFormServerErrors(error, form);
                },
                onSuccess: () => {
                    form.reset({
                        email: "",
                        password: "",
                        confirm_password: "",
                        captcha: "",
                    });
                    router.push("/auth/login")
                },
                onSettled: () => {
                    captchaRef.current?.reset();
                },
            });
        }),
        [form.handleSubmit, resetPassword.mutate]
    );

    return {
        form,
        loading: resetPassword.isPending,
        onSubmit,
        captchaRef
    };
}