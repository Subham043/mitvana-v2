"use client";

import { Controller } from "react-hook-form";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePasswordUpdate } from "../_lib/usePasswordUpdate";
import { Spinner } from "@/components/ui/spinner";

function PasswordForm() {
  const { form, onSubmit, loading } = usePasswordUpdate();
  return (
    <form onSubmit={onSubmit}>
      <Card className="w-full rounded-sm shadow-none p-0 gap-0">
        <CardHeader className="py-2 flex flex-row items-center justify-between bg-gray-50">
          <CardTitle className="text-lg text-[#194455]">Password</CardTitle>
          <CardAction>
            <Button
              variant="default"
              type="submit"
              size="sm"
              className="rounded-sm cursor-pointer bg-[#194455]"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Save"}
            </Button>
          </CardAction>
        </CardHeader>
        <hr className="m-0 p-0" />
        <CardContent className="py-2">
          <div className="flex gap-6">
            <Controller
              name="current_password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="grid gap-2 flex-1"
                >
                  <FieldLabel htmlFor="current_password">
                    Current Password
                  </FieldLabel>
                  <Input
                    id="current_password"
                    name="current_password"
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    type="password"
                    placeholder="********"
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
              name="new_password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="grid gap-2 flex-1"
                >
                  <FieldLabel htmlFor="new_password">New Password</FieldLabel>
                  <Input
                    id="new_password"
                    name="new_password"
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    type="password"
                    placeholder="********"
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
              name="confirm_new_password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="grid gap-2 flex-1"
                >
                  <FieldLabel htmlFor="confirm_new_password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirm_new_password"
                    name="confirm_new_password"
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    type="password"
                    placeholder="********"
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
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

export default PasswordForm;
