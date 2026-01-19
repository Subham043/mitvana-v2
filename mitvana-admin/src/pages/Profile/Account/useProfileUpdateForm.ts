import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { handleFormServerErrors } from "@/utils/helper";
import { useProfileQuery } from "@/utils/data/query/profile";
import { useProfileUpdateMutation } from "@/utils/data/mutation/profile";
import { useCallback, useEffect } from "react";
import { profileUpdateFormSchema, type ProfileUpdateFormValuesType } from "@/utils/data/schema/profile";

export function useProfileUpdateForm() {
  const { data, isLoading: isProfileLoading, isFetching: isProfileFetching, isRefetching: isProfileRefetching } = useProfileQuery()
  const profileUpdate = useProfileUpdateMutation();

  const form = useForm<ProfileUpdateFormValuesType>({
    resolver: yupResolver(profileUpdateFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    }
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
    }
  }, [data, form.reset]);

  const onSubmit = useCallback(
    form.handleSubmit((values) => {
      profileUpdate.mutate(values, {
        onError: (error) => {
          handleFormServerErrors(error, form);
        },
      });
    }),
    [form.handleSubmit, profileUpdate.mutate]
  );

  return {
    form,
    loading: profileUpdate.isPending,
    isProfileLoading,
    isProfileFetching,
    isProfileRefetching,
    data,
    onSubmit,
  };
}
