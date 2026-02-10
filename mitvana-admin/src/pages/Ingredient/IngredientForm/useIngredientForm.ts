import type { ExtendedModalProps } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type Resolver } from "react-hook-form";
import { handleFormServerErrors } from "@/utils/helper";
import { useCallback, useEffect } from "react";
import { useIngredientQuery } from "@/utils/data/query/ingredient";
import { ingredientSchema, type IngredientFormValuesType } from "@/utils/data/schema/ingredient";
import { useIngredientCreateMutation, useIngredientUpdateMutation } from "@/utils/data/mutation/ingredients";

type Props = {
  modal: ExtendedModalProps<{ id: string }>;
  closeModal: () => void;
};

const ingredientFormDefaultValues: IngredientFormValuesType = {
  is_update: false,
  title: "",
  description: "",
  thumbnail: undefined,
}

export function useIngredientForm({ modal, closeModal }: Props) {
  const { data, isLoading, isFetching, isRefetching } = useIngredientQuery(
    modal.type === "update" ? modal.id : "",
    modal.show && modal.type === "update"
  );

  const ingredientCreate = useIngredientCreateMutation();
  const ingredientUpdate = useIngredientUpdateMutation(modal.type === "update" ? modal.id : "");

  const form = useForm<IngredientFormValuesType>({
    resolver: yupResolver(ingredientSchema) as Resolver<IngredientFormValuesType>,
    defaultValues: ingredientFormDefaultValues,
  });

  useEffect(() => {
    if (modal.show) {
      if (data && modal.type === "update") {
        form.reset({
          is_update: true,
          title: data ? data.title : "",
          description: data && data.description ? data.description : "",
          thumbnail: undefined,
        });
      } else {
        form.reset(ingredientFormDefaultValues);
      }
    }
  }, [modal.show, modal.type, data]);

  const handleClose = useCallback(() => {
    form.reset(ingredientFormDefaultValues);
    closeModal();
  }, [form.reset, closeModal]);

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      if (modal.type === "update") {
        await ingredientUpdate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      } else {
        await ingredientCreate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      }
    }), [modal.type, form.handleSubmit, ingredientCreate.mutate, ingredientUpdate.mutate, handleClose]);

  return {
    form,
    data,
    isLoading: isLoading || isFetching || isRefetching,
    loading: ingredientCreate.isPending || ingredientUpdate.isPending,
    onSubmit,
    handleClose,
  };
}
