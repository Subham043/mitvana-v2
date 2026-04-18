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
import { useProfileUpdate } from "../_lib/useProfileUpdate";
import { Spinner } from "@/components/ui/spinner";

function ProfileForm() {
  const { form, onSubmit, loading, isLoading } = useProfileUpdate();
  return (
    <form onSubmit={onSubmit}>
      <Card className="w-full rounded-sm shadow-none p-0 gap-0">
        <CardHeader className="py-2 px-2 md:px-6 flex flex-row items-center justify-between bg-gray-50">
          <CardTitle className="text-lg text-[#194455]">Profile</CardTitle>
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
        {isLoading ? (
          <div className="text-center w-full flex items-center justify-center">
            <Spinner className="size-4" />
          </div>
        ) : (
          <CardContent className="py-2 px-2 md:px-6">
            <div className="flex flex-col md:flex-row gap-3 md:gap-6">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="grid gap-2 flex-1"
                  >
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      id="name"
                      name="name"
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                      type="text"
                      placeholder="Name"
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
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="grid gap-2 flex-1"
                  >
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
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="grid gap-2 flex-1"
                  >
                    <FieldLabel htmlFor="phone">Phone</FieldLabel>
                    <Input
                      id="phone"
                      name="phone"
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                      type="tel"
                      placeholder="1234567890"
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
        )}
      </Card>
    </form>
  );
}

export default ProfileForm;
