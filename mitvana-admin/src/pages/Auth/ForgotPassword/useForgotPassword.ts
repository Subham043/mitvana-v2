import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { handleFormServerErrors } from "@/utils/helper";
import { useForgotPasswordMutation } from "@/utils/data/mutation/auth";
import { forgotPasswordSchema, type ForgotPasswordFormValuesType } from "@/utils/data/schema/auth";

export function useForgotPassword() {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const forgotPassword = useForgotPasswordMutation()

  const form = useForm<ForgotPasswordFormValuesType>({
    resolver: yupResolver(forgotPasswordSchema),
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
    [form, forgotPassword]
  );

  return {
    form,
    loading: forgotPassword.isPending,
    onSubmit,
    captchaRef
  };
}