import type { ExtendedModalProps } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type Resolver } from "react-hook-form";
import { handleFormServerErrors } from "@/utils/helper";
import { useCallback, useEffect } from "react";
import { useCouponCodeQuery } from "@/utils/data/query/coupon_code";
import { couponCodeSchema, type CouponCodeFormValuesType } from "@/utils/data/schema/coupon_code";
import { useCouponCodeCreateMutation, useCouponCodeUpdateMutation } from "@/utils/data/mutation/coupon_codes";

type Props = {
  modal: ExtendedModalProps<{ id: string }>;
  closeModal: () => void;
};

const couponCodeFormDefaultValues: CouponCodeFormValuesType = {
  code: "",
  discount_percentage: 1,
  maximum_redemptions: 1,
  expiration_date: new Date(),
  min_cart_value: 0,
}

export function useCouponCodeForm({ modal, closeModal }: Props) {
  const { data, isLoading, isFetching, isRefetching } = useCouponCodeQuery(
    modal.type === "update" ? modal.id : "",
    modal.show && modal.type === "update"
  );

  const couponCodeCreate = useCouponCodeCreateMutation();
  const couponCodeUpdate = useCouponCodeUpdateMutation(modal.type === "update" ? modal.id : "");

  const form = useForm<CouponCodeFormValuesType>({
    resolver: yupResolver(couponCodeSchema) as Resolver<CouponCodeFormValuesType>,
    defaultValues: couponCodeFormDefaultValues,
  });

  useEffect(() => {
    if (modal.show) {
      if (data && modal.type === "update") {
        form.reset({
          code: data ? data.code : "",
          discount_percentage: data ? data.discount_percentage : 0,
          maximum_redemptions: data ? data.maximum_redemptions : 0,
          expiration_date: data ? new Date(data.expiration_date) : new Date(),
          min_cart_value: data ? data.min_cart_value : 0,
        });
      } else {
        form.reset(couponCodeFormDefaultValues);
      }
    }
  }, [modal.show, modal.type, data]);

  const handleClose = useCallback(() => {
    form.reset(couponCodeFormDefaultValues);
    closeModal();
  }, [form.reset, closeModal]);

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      if (modal.type === "update") {
        await couponCodeUpdate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      } else {
        await couponCodeCreate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      }
    }), [modal.type, form.handleSubmit, couponCodeCreate.mutate, couponCodeUpdate.mutate, handleClose]);

  return {
    form,
    data,
    isLoading: isLoading || isFetching || isRefetching,
    loading: couponCodeCreate.isPending || couponCodeUpdate.isPending,
    onSubmit,
    handleClose,
  };
}
