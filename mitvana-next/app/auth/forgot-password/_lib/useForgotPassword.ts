import { useForgotPasswordMutation } from "@/lib/data/mutations/auth";
import { ForgotPasswordFormValuesType, forgotPasswordSchema } from "@/lib/data/schemas/auth";
import { handleFormServerErrors } from "@/lib/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";


export function useForgotPassword() {
    const captchaRef = useRef<ReCAPTCHA>(null);
    const forgotPassword = useForgotPasswordMutation()

    const form = useForm<ForgotPasswordFormValuesType>({
        resolver: yupResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
            captcha: "",
        },
        mode: "onChange"
    });

    const onSubmit = useCallback(
        form.handleSubmit((values) => {
            forgotPassword.mutate(values, {
                onError: (error) => {
                    form.resetField("captcha")
                    handleFormServerErrors(error, form);
                },
                onSuccess: () => {
                    form.reset({
                        email: "",
                        captcha: "",
                    });
                },
                onSettled: () => {
                    captchaRef.current?.reset();
                },
            });
        }),
        [form.handleSubmit, forgotPassword.mutate]
    );

    return {
        form,
        loading: forgotPassword.isPending,
        onSubmit,
        captchaRef
    };
}