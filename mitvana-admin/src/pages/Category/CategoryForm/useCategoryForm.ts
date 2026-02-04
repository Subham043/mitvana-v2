import type { ExtendedModalProps } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type Resolver } from "react-hook-form";
import { handleFormServerErrors } from "@/utils/helper";
import { useCallback, useEffect } from "react";
import { useCategoryQuery } from "@/utils/data/query/category";
import { categorySchema, type CategoryFormValuesType } from "@/utils/data/schema/category";
import { useCategoryCreateMutation, useCategoryUpdateMutation } from "@/utils/data/mutation/categories";

type Props = {
  modal: ExtendedModalProps<{ id: string }>;
  closeModal: () => void;
};

const categoryFormDefaultValues: CategoryFormValuesType = {
  is_update: false,
  name: "",
  slug: undefined,
  description: "",
  thumbnail: undefined,
  is_visible_in_navigation: false,
}

export function useCategoryForm({ modal, closeModal }: Props) {
  const { data, isLoading, isFetching, isRefetching } = useCategoryQuery(
    modal.type === "update" ? modal.id : "",
    modal.show && modal.type === "update"
  );

  const categoryCreate = useCategoryCreateMutation();
  const categoryUpdate = useCategoryUpdateMutation(modal.type === "update" ? modal.id : "");

  const form = useForm<CategoryFormValuesType>({
    resolver: yupResolver(categorySchema) as Resolver<CategoryFormValuesType>,
    defaultValues: categoryFormDefaultValues,
  });

  useEffect(() => {
    if (modal.show) {
      if (data && modal.type === "update") {
        form.reset({
          is_update: true,
          name: data ? data.name : "",
          slug: data && data.slug ? data.slug : "",
          description: data && data.description ? data.description : "",
          thumbnail: undefined,
          is_visible_in_navigation: data && data.is_visible_in_navigation ? data.is_visible_in_navigation : false,
        });
      } else {
        form.reset(categoryFormDefaultValues);
      }
    }
  }, [modal.show, modal.type, data]);

  const handleClose = useCallback(() => {
    form.reset(categoryFormDefaultValues);
    closeModal();
  }, [form.reset, closeModal]);

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      if (modal.type === "update") {
        await categoryUpdate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      } else {
        await categoryCreate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      }
    }), [modal.type, form.handleSubmit, categoryCreate.mutate, categoryUpdate.mutate, handleClose]);

  return {
    form,
    data,
    isLoading: isLoading || isFetching || isRefetching,
    loading: categoryCreate.isPending || categoryUpdate.isPending,
    onSubmit,
    handleClose,
  };
}
