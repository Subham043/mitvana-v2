import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { passwordUpdateFormSchema, type PasswordUpdateFormValuesType } from "./schema";
import { usePasswordUpdateMutation } from "@/utils/data/mutation/profile";
import { handleFormServerErrors } from "@/utils/helper";

export function usePasswordUpdateForm() {
  const passwordUpdate = usePasswordUpdateMutation();

  const form = useForm<PasswordUpdateFormValuesType>({
    resolver: yupResolver(passwordUpdateFormSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    }
  });

  const onSubmit = useCallback(
    form.handleSubmit((values) => {
      passwordUpdate.mutate(values, {
        onError: (error) => {
          handleFormServerErrors(error, form);
        },
        onSuccess: () => {
          form.reset({
            current_password: "",
            new_password: "",
            confirm_new_password: "",
          });
        }
      });
    }),
    [form, passwordUpdate]
  );

  return {
    form,
    loading: passwordUpdate.isPending,
    onSubmit,
  };
}
