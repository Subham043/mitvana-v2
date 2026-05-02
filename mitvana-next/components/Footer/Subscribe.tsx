"use client";

import { useSubscribeMutation } from "@/lib/data/mutations/subscription";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import {
  SubscriptionFormValuesType,
  subscriptionSchema,
} from "@/lib/data/schemas/subscription";
import { handleFormServerErrors } from "@/lib/helper";
import { Spinner } from "../ui/spinner";
import { FieldError } from "../ui/field";

function Subscribe() {
  const subscribeMutation = useSubscribeMutation();

  const form = useForm<SubscriptionFormValuesType>({
    resolver: yupResolver(subscriptionSchema),
    values: {
      email: "",
    },
    mode: "onChange",
  });

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      await subscribeMutation.mutateAsync(values, {
        onError: (error) => {
          handleFormServerErrors(error, form);
        },
        onSuccess: () => {
          form.reset({
            email: "",
          });
        },
      });
    }),
    [form.handleSubmit, subscribeMutation.mutate],
  );

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="w-full flex items-center gap-2">
        {/* Email input and Subscribe button in the same row */}
        <Controller
          name="email"
          control={form.control}
          render={({ field }) => (
            <input
              type="email"
              placeholder="Your Email"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              className="w-1/2 px-2 py-2 text-sm rounded outline-none bg-white flex-1"
            />
          )}
        />
        <button
          type="submit"
          className="text-sm px-3 py-2 bg-[#6e8456] text-white rounded"
          disabled={subscribeMutation.isPending}
        >
          {subscribeMutation.isPending ? <Spinner /> : "Subscribe"}
        </button>
      </div>
      {form.formState.errors.email && (
        <FieldError
          errors={[{ message: form.formState.errors.email?.message }]}
        />
      )}
    </form>
  );
}

export default Subscribe;
