import type { ExtendedModalProps } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type Resolver } from "react-hook-form";
import { handleFormServerErrors } from "@/utils/helper";
import { useCallback, useEffect } from "react";
import { useHeroImageQuery } from "@/utils/data/query/hero_image";
import { heroImageSchema, type HeroImageFormValuesType } from "@/utils/data/schema/hero_image";
import { useHeroImageCreateMutation, useHeroImageUpdateMutation } from "@/utils/data/mutation/hero_images";

type Props = {
  modal: ExtendedModalProps<{ id: string }>;
  closeModal: () => void;
};

const heroImageFormDefaultValues: HeroImageFormValuesType = {
  is_update: false,
  content: "",
  image: undefined,
}

export function useHeroImageForm({ modal, closeModal }: Props) {
  const { data, isLoading, isFetching, isRefetching } = useHeroImageQuery(
    modal.type === "update" ? modal.id : "",
    modal.show && modal.type === "update"
  );

  const heroImageCreate = useHeroImageCreateMutation();
  const heroImageUpdate = useHeroImageUpdateMutation(modal.type === "update" ? modal.id : "");

  const form = useForm<HeroImageFormValuesType>({
    resolver: yupResolver(heroImageSchema) as Resolver<HeroImageFormValuesType>,
    defaultValues: heroImageFormDefaultValues,
  });

  useEffect(() => {
    if (modal.show) {
      if (data && modal.type === "update") {
        form.reset({
          is_update: true,
          content: data ? data.content : "",
          image: undefined,
        });
      } else {
        form.reset(heroImageFormDefaultValues);
      }
    }
  }, [modal.show, modal.type, data]);

  const handleClose = useCallback(() => {
    form.reset(heroImageFormDefaultValues);
    closeModal();
  }, [form.reset, closeModal]);

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      if (modal.type === "update") {
        await heroImageUpdate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      } else {
        await heroImageCreate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      }
    }), [modal.type, form.handleSubmit, heroImageCreate.mutate, heroImageUpdate.mutate, handleClose]);

  return {
    form,
    data,
    isLoading: isLoading || isFetching || isRefetching,
    loading: heroImageCreate.isPending || heroImageUpdate.isPending,
    onSubmit,
    handleClose,
  };
}
