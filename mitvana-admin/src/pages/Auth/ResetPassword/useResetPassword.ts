import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { page_routes } from "@/utils/routes/page_routes";
import ReCAPTCHA from "react-google-recaptcha";
import { handleFormServerErrors } from "@/utils/helper";
import { useToast } from "@/hooks/useToast";
import { useResetPasswordMutation } from "@/utils/data/mutation/auth";
import { resetPasswordSchema, type ResetPasswordFormValuesType } from "@/utils/data/schema/auth";

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
    defaultValues: { password: "", email: "", confirm_password: "", captcha: "" },
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
            confirm_password: "",
            captcha: ""
          });
          navigate(page_routes.login.link, { replace: true });
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
    captchaRef,
    onSubmit,
  };
}