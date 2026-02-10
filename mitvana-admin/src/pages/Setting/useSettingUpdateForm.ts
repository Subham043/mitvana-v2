import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type Resolver } from "react-hook-form";
import { handleFormServerErrors } from "@/utils/helper";
import { useSettingQuery } from "@/utils/data/query/setting";
import { useSettingsUpdateMutation } from "@/utils/data/mutation/settings";
import { useCallback, useEffect } from "react";
import { settingSchema, type SettingFormValuesType } from "@/utils/data/schema/setting";

export function useSettingUpdateForm() {
  const { data, isLoading, isFetching, isRefetching } = useSettingQuery(true)
  const settingUpdate = useSettingsUpdateMutation();

  const form = useForm<SettingFormValuesType>({
    resolver: yupResolver(settingSchema) as Resolver<SettingFormValuesType>,
    defaultValues: {
      min_cart_value_for_free_shipping: undefined,
      admin_email: undefined,
      top_banner_text: undefined,
    }
  });

  useEffect(() => {
    if (data) {
      form.reset({
        min_cart_value_for_free_shipping: data.min_cart_value_for_free_shipping !== null ? Number(data.min_cart_value_for_free_shipping) : undefined,
        admin_email: data.admin_email !== null ? String(data.admin_email) : undefined,
        top_banner_text: data.top_banner_text !== null ? String(data.top_banner_text) : undefined,
      });
    }
  }, [data, form.reset]);

  const onSubmit = useCallback(
    form.handleSubmit((values) => {
      settingUpdate.mutate(values, {
        onError: (error) => {
          handleFormServerErrors(error, form);
        },
      });
    }),
    [form.handleSubmit, settingUpdate.mutate]
  );

  return {
    form,
    loading: settingUpdate.isPending,
    isLoading,
    isFetching,
    isRefetching,
    data,
    onSubmit,
  };
}
