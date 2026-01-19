import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { handleFormServerErrors } from "@/utils/helper";
import { useProfileQuery } from "@/utils/data/query/profile";
import { useProfileUpdateMutation } from "@/utils/data/mutation/profile";
import { useCallback } from "react";
import { profileUpdateFormSchema, type ProfileUpdateFormValuesType } from "@/utils/data/schema/profile";

export function useProfileUpdateForm() {
  const { data, isLoading: isProfileLoading, isFetching: isProfileFetching, isRefetching: isProfileRefetching } = useProfileQuery()
  const profileUpdate = useProfileUpdateMutation();

  const form = useForm<ProfileUpdateFormValuesType>({
    resolver: yupResolver(profileUpdateFormSchema),
    values: {
      name: data ? data.name : "",
      email: data ? data.email : "",
      phone: data ? data.phone : "",
    }
  });

  const onSubmit = useCallback(
    form.handleSubmit((values) => {
      profileUpdate.mutate(values, {
        onError: (error) => {
          handleFormServerErrors(error, form);
        },
      });
    }),
    [form, profileUpdate]
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
