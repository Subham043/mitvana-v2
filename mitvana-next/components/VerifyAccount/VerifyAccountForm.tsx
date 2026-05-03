"use client";

import { Controller, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import CaptchaInput from "../CaptchaInput";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useCallback, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
  VerifyAccountFormValuesType,
  verifyAccountSchema,
} from "@/lib/data/schemas/profile";
import { yupResolver } from "@hookform/resolvers/yup";
import { useVerifyProfileMutation } from "@/lib/data/mutations/profile";
import { handleFormServerErrors } from "@/lib/helper";
import LogoutBtn from "./LogoutBtn";
import ResendCodeBtn from "./ResendCodeBtn";
import { useRouter } from "next/navigation";

function VerifyAccountForm() {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const verifyAccount = useVerifyProfileMutation();
  const router = useRouter();

  const form = useForm<VerifyAccountFormValuesType>({
    resolver: yupResolver(verifyAccountSchema),
    defaultValues: {
      verification_code: "",
      captcha: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      await verifyAccount.mutateAsync(values, {
        onError: (error) => {
          form.resetField("captcha");
          handleFormServerErrors(error, form);
        },
        onSuccess: () => {
          form.reset({
            verification_code: "",
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
    [form.handleSubmit, verifyAccount.mutate],
  );

  return (
    <form onSubmit={onSubmit}>
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Verify Your Account!</CardTitle>
          <CardDescription>
            You need to verify your account by clicking on the link sent to your
            registered email address. If you didn't receive the email, we will
            gladly send you another.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Controller
              name="verification_code"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="grid gap-2">
                  <FieldLabel htmlFor="verification_code">
                    Verification Code
                  </FieldLabel>
                  <Input
                    id="verification_code"
                    name="verification_code"
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    type="number"
                    placeholder="Verification Code"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[{ message: fieldState.error?.message }]}
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              name="captcha"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="grid gap-2">
                  <FieldLabel htmlFor={field.name}>Captcha</FieldLabel>
                  <CaptchaInput
                    onChange={(val) => {
                      field.onChange(val);
                      field.onBlur();
                    }}
                    ref={captchaRef}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[{ message: fieldState.error?.message }]}
                    />
                  )}
                </Field>
              )}
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <Spinner /> : "Verify Account"}
          </Button>
          <ResendCodeBtn />
          <LogoutBtn />
        </CardFooter>
      </Card>
    </form>
  );
}

export default VerifyAccountForm;
