import type { ExtendedModalProps } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { handleFormServerErrors } from "@/utils/helper";
import { useCallback, useEffect } from "react";
import { useColorQuery } from "@/utils/data/query/color";
import { colorSchema, type ColorFormValuesType } from "@/utils/data/schema/color";
import { useColorCreateMutation, useColorUpdateMutation } from "@/utils/data/mutation/colors";

type Props = {
  modal: ExtendedModalProps<{ id: string }>;
  closeModal: () => void;
};

const colorFormDefaultValues = {
  name: "",
  code: "",
}

export function useColorForm({ modal, closeModal }: Props) {
  const { data, isLoading, isFetching, isRefetching } = useColorQuery(
    modal.type === "update" ? modal.id : "",
    modal.show && modal.type === "update"
  );

  const colorCreate = useColorCreateMutation();
  const colorUpdate = useColorUpdateMutation(modal.type === "update" ? modal.id : "");

  const form = useForm<ColorFormValuesType>({
    resolver: yupResolver(colorSchema),
    defaultValues: colorFormDefaultValues,
  });

  useEffect(() => {
    if (modal.show) {
      if (data && modal.type === "update") {
        form.reset({
          name: data ? data.name : "",
          code: data ? data.code : "",
        });
      } else {
        form.reset(colorFormDefaultValues);
      }
    }
  }, [modal.show, modal.type, data]);

  const handleClose = useCallback(() => {
    form.reset(colorFormDefaultValues);
    closeModal();
  }, [form.reset, closeModal]);

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      if (modal.type === "update") {
        await colorUpdate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      } else {
        await colorCreate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      }
    }), [modal.type, form.handleSubmit, colorCreate.mutate, colorUpdate.mutate, handleClose]);

  return {
    form,
    data,
    isLoading: isLoading || isFetching || isRefetching,
    loading: colorCreate.isPending || colorUpdate.isPending,
    onSubmit,
    handleClose,
  };
}
