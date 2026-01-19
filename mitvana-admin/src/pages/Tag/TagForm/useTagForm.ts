import type { ExtendedModalProps } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { handleFormServerErrors } from "@/utils/helper";
import { useCallback, useEffect } from "react";
import { useTagQuery } from "@/utils/data/query/tag";
import { tagSchema, type TagFormValuesType } from "@/utils/data/schema/tag";
import { useTagCreateMutation, useTagUpdateMutation } from "@/utils/data/mutation/tags";

type Props = {
  modal: ExtendedModalProps<{ id: string }>;
  closeModal: () => void;
};

const tagFormDefaultValues = {
  name: "",
}

export function useTagForm({ modal, closeModal }: Props) {
  const { data, isLoading, isFetching, isRefetching } = useTagQuery(
    modal.type === "update" ? modal.id : "",
    modal.show && modal.type === "update"
  );

  const tagCreate = useTagCreateMutation();
  const tagUpdate = useTagUpdateMutation(modal.type === "update" ? modal.id : "");

  const form = useForm<TagFormValuesType>({
    resolver: yupResolver(tagSchema),
    defaultValues: tagFormDefaultValues,
  });

  useEffect(() => {
    if (modal.show) {
      if (data && modal.type === "update") {
        form.reset({
          name: data ? data.name : "",
        });
      } else {
        form.reset(tagFormDefaultValues);
      }
    }
  }, [modal.show, modal.type, data]);

  const handleClose = useCallback(() => {
    form.reset(tagFormDefaultValues);
    closeModal();
  }, [form.reset, closeModal]);

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      if (modal.type === "update") {
        await tagUpdate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      } else {
        await tagCreate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      }
    }), [modal.type, form.handleSubmit, tagCreate.mutate, tagUpdate.mutate, handleClose]);

  return {
    form,
    data,
    isLoading: isLoading || isFetching || isRefetching,
    loading: tagCreate.isPending || tagUpdate.isPending,
    onSubmit,
    handleClose,
  };
}
