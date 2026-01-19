import type { ExtendedModalProps } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type UseFormReturn } from "react-hook-form";
import { handleFormServerErrors } from "@/utils/helper";
import { userCreateSchema, userUpdateSchema, type UserCreateFormValuesType, type UserUpdateFormValuesType } from "@/utils/data/schema/user";
import { useUserCreateMutation, useUserUpdateMutation } from "@/utils/data/mutation/users";
import { useUserQuery } from "@/utils/data/query/user";
import { useCallback, useEffect } from "react";

type Props = {
  modal: ExtendedModalProps<{ id: string }>;
  closeModal: () => void;
};

const userFormDefaultValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirm_password: "",
  is_blocked: false,
}

export function useUserForm({ modal, closeModal }: Props) {
  const { data, isLoading, isFetching, isRefetching } = useUserQuery(
    modal.type === "update" ? modal.id : "",
    modal.show && modal.type === "update"
  );

  const userCreate = useUserCreateMutation();
  const userUpdate = useUserUpdateMutation(modal.type === "update" ? modal.id : "");

  const form = useForm({
    resolver: yupResolver(modal.type === "update" ? userUpdateSchema : userCreateSchema),
    defaultValues: userFormDefaultValues,
  });

  useEffect(() => {
    if (modal.show) {
      if (data && modal.type === "update") {
        form.reset({
          name: data ? data.name : "",
          email: data ? data.email : "",
          phone: data ? data.phone : "",
          password: undefined,
          confirm_password: undefined,
          is_blocked: data && data.is_blocked !== undefined ? data.is_blocked : false,
        });
      } else {
        form.reset(userFormDefaultValues);
      }
    }
  }, [modal.show, modal.type, data]);

  const handleClose = useCallback(() => {
    form.reset(userFormDefaultValues);
    closeModal();
  }, [form.reset, closeModal]);

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      if (modal.type === "update") {
        await userUpdate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form as UseFormReturn<UserUpdateFormValuesType>);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      } else {
        await userCreate.mutateAsync(values as UserCreateFormValuesType, {
          onError: (error) => {
            handleFormServerErrors(error, form as UseFormReturn<UserCreateFormValuesType>);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      }
    }), [modal.type, form.handleSubmit, userCreate.mutate, userUpdate.mutate, handleClose]);

  return {
    form,
    data,
    isLoading: isLoading || isFetching || isRefetching,
    loading: userCreate.isPending || userUpdate.isPending,
    onSubmit,
    handleClose,
  };
}
