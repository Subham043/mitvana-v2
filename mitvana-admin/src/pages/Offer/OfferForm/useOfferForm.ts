import type { ExtendedModalProps } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type Resolver } from "react-hook-form";
import { handleFormServerErrors } from "@/utils/helper";
import { useCallback, useEffect } from "react";
import { useOfferQuery } from "@/utils/data/query/offer";
import { offerSchema, type OfferFormValuesType } from "@/utils/data/schema/offer";
import { useOfferCreateMutation, useOfferUpdateMutation } from "@/utils/data/mutation/offers";

type Props = {
  modal: ExtendedModalProps<{ id: string }>;
  closeModal: () => void;
};

const offerFormDefaultValues: OfferFormValuesType = {
  title: "",
  description: undefined,
  discount_percentage: 1,
  max_discount: 0,
  min_cart_value: 0,
  products: []
}

export function useOfferForm({ modal, closeModal }: Props) {
  const { data, isLoading, isFetching, isRefetching } = useOfferQuery(
    modal.type === "update" ? modal.id : "",
    modal.show && modal.type === "update"
  );

  const offerCreate = useOfferCreateMutation();
  const offerUpdate = useOfferUpdateMutation(modal.type === "update" ? modal.id : "");

  const form = useForm<OfferFormValuesType>({
    resolver: yupResolver(offerSchema) as Resolver<OfferFormValuesType>,
    defaultValues: offerFormDefaultValues,
  });

  useEffect(() => {
    if (modal.show) {
      if (data && modal.type === "update") {
        form.reset({
          title: data ? data.title : "",
          description: data && data.description !== undefined ? data.description : undefined,
          discount_percentage: data ? data.discount_percentage : 0,
          max_discount: data && data.max_discount !== undefined ? data.max_discount : 0,
          min_cart_value: data && data.min_cart_value !== undefined ? data.min_cart_value : 0,
          products: data && data.products !== undefined && data.products.length > 0 ? data.products.map((product) => ({ label: product.product.title, value: product.product.id })) : [],
        });
      } else {
        form.reset(offerFormDefaultValues);
      }
    }
  }, [modal.show, modal.type, data]);

  const handleClose = useCallback(() => {
    form.reset(offerFormDefaultValues);
    closeModal();
  }, [form.reset, closeModal]);

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      if (modal.type === "update") {
        await offerUpdate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      } else {
        await offerCreate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      }
    }), [modal.type, form.handleSubmit, offerCreate.mutate, offerUpdate.mutate, handleClose]);

  return {
    form,
    data,
    isLoading: isLoading || isFetching || isRefetching,
    loading: offerCreate.isPending || offerUpdate.isPending,
    onSubmit,
    handleClose,
  };
}
