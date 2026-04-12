import { useProfileUpdateMutation } from "@/lib/data/mutations/profile";
import { useProfileQuery } from "@/lib/data/queries/profile";
import { profileUpdateFormSchema, ProfileUpdateFormValuesType } from "@/lib/data/schemas/profile";
import { handleFormServerErrors } from "@/lib/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import { useForm } from "react-hook-form";


export function useProfileUpdate() {
    const { data, isLoading } = useProfileQuery()
    const profileMutation = useProfileUpdateMutation()

    const form = useForm<ProfileUpdateFormValuesType>({
        resolver: yupResolver(profileUpdateFormSchema),
        values: {
            email: data?.email || "",
            name: data?.name || "",
            phone: data?.phone || ""
        },
        mode: "onChange"
    });

    const onSubmit = useCallback(
        form.handleSubmit((values) => {
            profileMutation.mutate(values, {
                onError: (error) => {
                    handleFormServerErrors(error, form);
                },
                onSuccess: (values) => {
                    form.reset({
                        email: values.email,
                        name: values.name,
                        phone: values.phone
                    });
                },
            });
        }),
        [form.handleSubmit, profileMutation.mutate]
    );

    return {
        form,
        isLoading,
        loading: profileMutation.isPending,
        onSubmit,
    };
}