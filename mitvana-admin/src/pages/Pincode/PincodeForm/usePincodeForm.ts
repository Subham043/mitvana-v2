import type { ExtendedModalProps } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type Resolver } from "react-hook-form";
import { handleFormServerErrors } from "@/utils/helper";
import { useCallback, useEffect } from "react";
import { usePincodeQuery } from "@/utils/data/query/pincode";
import { pincodeSchema, type PincodeFormValuesType } from "@/utils/data/schema/pincode";
import { usePincodeCreateMutation, usePincodeUpdateMutation } from "@/utils/data/mutation/pincodes";

type Props = {
  modal: ExtendedModalProps<{ id: string }>;
  closeModal: () => void;
};

const pincodeFormDefaultValues: PincodeFormValuesType = {
  pincode: 0,
  service: undefined,
  tat: undefined,
}

export function usePincodeForm({ modal, closeModal }: Props) {
  const { data, isLoading, isFetching, isRefetching } = usePincodeQuery(
    modal.type === "update" ? modal.id : "",
    modal.show && modal.type === "update"
  );

  const pincodeCreate = usePincodeCreateMutation();
  const pincodeUpdate = usePincodeUpdateMutation(modal.type === "update" ? modal.id : "");

  const form = useForm<PincodeFormValuesType>({
    resolver: yupResolver(pincodeSchema) as Resolver<PincodeFormValuesType>,
    defaultValues: pincodeFormDefaultValues,
  });

  useEffect(() => {
    if (modal.show) {
      if (data && modal.type === "update") {
        form.reset({
          pincode: data ? data.pincode : 0,
          service: data && data.service ? data.service : undefined,
          tat: data && data.tat ? data.tat : undefined,
        });
      } else {
        form.reset(pincodeFormDefaultValues);
      }
    }
  }, [modal.show, modal.type, data]);

  const handleClose = useCallback(() => {
    form.reset(pincodeFormDefaultValues);
    closeModal();
  }, [form.reset, closeModal]);

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      if (modal.type === "update") {
        await pincodeUpdate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      } else {
        await pincodeCreate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      }
    }), [modal.type, form.handleSubmit, pincodeCreate.mutate, pincodeUpdate.mutate, handleClose]);

  return {
    form,
    data,
    isLoading: isLoading || isFetching || isRefetching,
    loading: pincodeCreate.isPending || pincodeUpdate.isPending,
    onSubmit,
    handleClose,
  };
}
