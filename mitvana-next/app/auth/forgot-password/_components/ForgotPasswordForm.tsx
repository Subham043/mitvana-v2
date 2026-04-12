"use client";

import { Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import CaptchaInput from "@/components/CaptchaInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForgotPassword } from "../_lib/useForgotPassword";
import { Spinner } from "@/components/ui/spinner";

function ForgotPasswordForm() {
  const { form, onSubmit, loading, captchaRef } = useForgotPassword();
  return (
    <form onSubmit={onSubmit}>
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Forgot your Password?</CardTitle>
          <CardDescription>
            Enter your email below to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="grid gap-2">
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    type="email"
                    placeholder="m@example.com"
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
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Spinner /> : "Reset Password"}
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/auth/login">Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default ForgotPasswordForm;
