import type { ExtendedModalProps } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type Resolver } from "react-hook-form";
import { handleFormServerErrors } from "@/utils/helper";
import { userSchema, type UserFormValuesType } from "@/utils/data/schema/user";
import { useUserCreateMutation, useUserUpdateMutation } from "@/utils/data/mutation/users";
import { useUserQuery } from "@/utils/data/query/user";
import { useCallback, useEffect } from "react";

type Props = {
  modal: ExtendedModalProps<{ id: string }>;
  closeModal: () => void;
};

const userFormDefaultValues: UserFormValuesType = {
  name: "",
  email: "",
  phone: "",
  password: undefined,
  confirm_password: undefined,
  is_blocked: false,
  is_update: false,
}

export function useUserForm({ modal, closeModal }: Props) {
  const { data, isLoading, isFetching, isRefetching } = useUserQuery(
    modal.type === "update" ? modal.id : "",
    modal.show && modal.type === "update"
  );

  const userCreate = useUserCreateMutation();
  const userUpdate = useUserUpdateMutation(modal.type === "update" ? modal.id : "");

  const form = useForm<UserFormValuesType>({
    resolver: yupResolver(userSchema) as Resolver<UserFormValuesType>,
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
          is_update: true,
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
            handleFormServerErrors(error, form);
          },
          onSuccess: () => {
            handleClose();
          }
        });
      } else {
        await userCreate.mutateAsync(values, {
          onError: (error) => {
            handleFormServerErrors(error, form);
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
