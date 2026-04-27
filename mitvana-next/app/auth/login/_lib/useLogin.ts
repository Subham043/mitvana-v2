import { useLoginMutation } from "@/lib/data/mutations/auth";
import { LoginFormValuesType, loginSchema } from "@/lib/data/schemas/auth";
import { handleFormServerErrors } from "@/lib/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";


export function useLogin() {
    const captchaRef = useRef<ReCAPTCHA>(null);
    const login = useLoginMutation()
    const router = useRouter()

    const form = useForm<LoginFormValuesType>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            captcha: "",
        },
        mode: "onChange"
    });

    const onSubmit = useCallback(
        form.handleSubmit((values) => {
            login.mutate(values, {
                onError: (error) => {
                    form.resetField("captcha")
                    handleFormServerErrors(error, form);
                },
                onSuccess: () => {
                    form.reset({
                        email: "",
                        password: "",
                        captcha: "",
                    });
                    router.replace("/account/profile");
                    router.refresh();
                },
                onSettled: () => {
                    captchaRef.current?.reset();
                },
            });
        }),
        [form.handleSubmit, login.mutate]
    );

    return {
        form,
        loading: login.isPending,
        onSubmit,
        captchaRef
    };
}