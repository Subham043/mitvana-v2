import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { resetPasswordSchema, type ResetPasswordFormValuesType } from "./schema";
import { useNavigate } from "react-router";
import { page_routes } from "@/utils/routes/page_routes";
import ReCAPTCHA from "react-google-recaptcha";
import { handleFormServerErrors } from "@/utils/helper";
import { useToast } from "@/hooks/useToast";
import { useResetPasswordMutation } from "@/utils/data/mutation/auth";

type Props = {
  token: string
}

export function useResetPassword({ token }: Props) {
  const navigate = useNavigate();
  const captchaRef = useRef<ReCAPTCHA>(null);
  const { toastError } = useToast();
  const resetPassword = useResetPasswordMutation()

  const form = useForm<ResetPasswordFormValuesType>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: { password: "", email: "", password_confirmation: "", captcha: "" },
  });

  const onSubmit = useCallback(
    form.handleSubmit((values) => {
      if (token.length === 0) {
        toastError("Invalid token");
        return;
      }
      resetPassword.mutate({
        ...values,
        token
      }, {
        onError: (error) => {
          form.resetField("captcha")
          handleFormServerErrors(error, form);
        },
        onSuccess: () => {
          form.reset({
            email: "",
            password: "",
            password_confirmation: "",
            captcha: ""
          });
          navigate(page_routes.login.link, { replace: true });
        },
        onSettled: () => {
          captchaRef.current?.reset();
        },
      });
    }),
    [form, resetPassword]
  );

  return {
    form,
    loading: resetPassword.isPending,
    captchaRef,
    onSubmit,
  };
}