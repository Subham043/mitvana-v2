import { useRegisterMutation } from "@/lib/data/mutations/auth";
import { RegisterFormValuesType, registerSchema } from "@/lib/data/schemas/auth";
import { handleFormServerErrors } from "@/lib/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";


export function useRegister() {
    const captchaRef = useRef<ReCAPTCHA>(null);
    const register = useRegisterMutation()

    const form = useForm<RegisterFormValuesType>({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirm_password: "",
            captcha: "",
        },
        mode: "onChange"
    });

    const onSubmit = useCallback(
        form.handleSubmit(async (values) => {
            await register.mutateAsync(values, {
                onError: (error) => {
                    form.resetField("captcha")
                    handleFormServerErrors(error, form);
                },
                onSuccess: () => {
                    form.reset({
                        name: "",
                        email: "",
                        phone: "",
                        password: "",
                        confirm_password: "",
                        captcha: "",
                    });
                },
                onSettled: () => {
                    captchaRef.current?.reset();
                },
            });
        }),
        [form.handleSubmit, register.mutate]
    );

    return {
        form,
        loading: register.isPending,
        onSubmit,
        captchaRef
    };
}