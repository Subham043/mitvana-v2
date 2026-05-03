import { usePasswordUpdateMutation } from "@/lib/data/mutations/profile";
import { passwordUpdateFormSchema, PasswordUpdateFormValuesType } from "@/lib/data/schemas/profile";
import { handleFormServerErrors } from "@/lib/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import { useForm } from "react-hook-form";


export function usePasswordUpdate() {
    const passwordMutation = usePasswordUpdateMutation()

    const form = useForm<PasswordUpdateFormValuesType>({
        resolver: yupResolver(passwordUpdateFormSchema),
        values: {
            current_password: "",
            new_password: "",
            confirm_new_password: ""
        },
        mode: "onSubmit"
    });

    const onSubmit = useCallback(
        form.handleSubmit(async (values) => {
            await passwordMutation.mutateAsync(values, {
                onError: (error) => {
                    handleFormServerErrors(error, form);
                },
                onSuccess: () => {
                    form.reset({
                        current_password: "",
                        new_password: "",
                        confirm_new_password: ""
                    });
                },
            });
        }),
        [form.handleSubmit, passwordMutation.mutate]
    );

    return {
        form,
        onSubmit,
    };
}