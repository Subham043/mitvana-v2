import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { handleFormServerErrors } from "@/utils/helper";
import { useLoginMutation } from "@/utils/data/mutation/auth";
import { loginSchema, type LoginFormValuesType } from "@/utils/data/schema/auth";

export function useLogin() {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const login = useLoginMutation()

  const form = useForm<LoginFormValuesType>({
    resolver: yupResolver(loginSchema),
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
    captchaRef,
    onSubmit,
  };
}
