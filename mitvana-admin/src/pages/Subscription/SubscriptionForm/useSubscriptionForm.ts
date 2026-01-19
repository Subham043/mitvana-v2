import type { ExtendedModalProps } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { handleFormServerErrors } from "@/utils/helper";
import { useCallback, useEffect } from "react";
import { useSubscriptionQuery } from "@/utils/data/query/subscription";
import { subscriptionSchema, type SubscriptionFormValuesType } from "@/utils/data/schema/subscription";
import { useSubscriptionCreateMutation, useSubscriptionUpdateMutation } from "@/utils/data/mutation/subscriptions";

type Props = {
  modal: ExtendedModalProps<{ id: string }>;
  closeModal: () => void;
};

const subscriptionFormDefaultValues = {
  email: "",
}

export function useSubscriptionForm({ modal, closeModal }: Props) {
  const { data, isLoading, isFetching, isRefetching } = useSubscriptionQuery(
    modal.type === "update" ? modal.id : "",
    modal.show && modal.type === "update"
  );

  const subscriptionCreate = useSubscriptionCreateMutation();
  const subscriptionUpdate = useSubscriptionUpdateMutation(modal.type === "update" ? modal.id : "");

  const form = useForm<SubscriptionFormValuesType>({
    resolver: yupResolver(subscriptionSchema),
    defaultValues: subscriptionFormDefaultValues,
  });

  useEffect(() => {
    if (modal.show) {
      if (data && modal.type === "update") {
        form.reset({
          email: data ? data.email : "",
        });
      } else {
        form.reset(subscriptionFormDefaultValues);
      }
    }
  }, [modal.show, modal.type, data]);

  const handleClose = useCallback(() => {
    form.reset(subscriptionFormDefaultValues);
    closeModal();
  }, [form.reset, closeModal]);

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      if (modal.type === "update") {
        await subscriptionUpdate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      } else {
        await subscriptionCreate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      }
    }), [modal.type, form.handleSubmit, subscriptionCreate.mutate, subscriptionUpdate.mutate, handleClose]);

  return {
    form,
    data,
    isLoading: isLoading || isFetching || isRefetching,
    loading: subscriptionCreate.isPending || subscriptionUpdate.isPending,
    onSubmit,
    handleClose,
  };
}
