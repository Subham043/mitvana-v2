import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { usePasswordUpdateMutation } from "@/utils/data/mutation/profile";
import { handleFormServerErrors } from "@/utils/helper";
import { passwordUpdateFormSchema, type PasswordUpdateFormValuesType } from "@/utils/data/schema/profile";

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
    form.handleSubmit(async (values) => {
      await passwordUpdate.mutateAsync(values, {
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
    [form.handleSubmit, passwordUpdate.mutateAsync]
  );

  return {
    form,
    onSubmit,
  };
}
