import React, { createContext, useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { type Resolver, useForm } from "react-hook-form";
import SuspenseOutlet from "@/components/SuspenseOutlet";
import { Modal, Button, TextInput, Group } from "@mantine/core";

interface ConfirmForm {
  confirmation: "DELETE";
}

const schema = yup
  .object()
  .shape({
    confirmation: yup
      .string()
      .oneOf(["DELETE"], "You must enter DELETE to confirm.")
      .required("Confirmation is required"),
  })
  .required();

type ModalProps =
  | {
      status: true;
      callback: () => Promise<void> | void;
    }
  | {
      status: false;
    };

/*
 * Delete Context Type
 */
type DeleteContextType = {
  deleteModal: boolean;
  handleDeleteModalOpen: (callback: () => Promise<void> | void) => void;
  handleDeleteModalClose: () => void;
};

/*
 * Delete Context Default Value
 */
const deleteDefaultValues: DeleteContextType = {
  deleteModal: false,
  handleDeleteModalOpen: async (callback: () => Promise<void> | void) => {
    await callback();
  },
  handleDeleteModalClose: () => {},
};

/*
 * Delete Context
 */
// eslint-disable-next-line react-refresh/only-export-components
export const DeleteContext =
  createContext<DeleteContextType>(deleteDefaultValues);

/*
 * Delete Provider
 */
const DeleteProvider: React.FC = () => {
  const [deleteModal, setDeleteModal] = useState<ModalProps>({ status: false });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ConfirmForm>({
    resolver: yupResolver(schema) as Resolver<{ confirmation: "DELETE" }>,
  });

  const resetField = useCallback(() => {
    reset({
      confirmation: undefined,
    });
  }, [reset]);

  useEffect(() => {
    if (deleteModal.status) {
      resetField();
    }
  }, [deleteModal.status, resetField]);

  const handleDeleteModalClose = useCallback(() => {
    setDeleteModal({ status: false });
    resetField();
  }, [resetField]);

  const handleDeleteModalOpen = useCallback(
    (callback: () => Promise<void> | void) =>
      setDeleteModal({ status: true, callback }),
    [],
  );

  const deleteHandler = useCallback(async () => {
    if (deleteModal.status) {
      deleteModal.callback();
    }
    handleDeleteModalClose();
  }, [deleteModal, handleDeleteModalClose]);

  return (
    <DeleteContext.Provider
      value={{
        deleteModal: deleteModal.status,
        handleDeleteModalOpen,
        handleDeleteModalClose,
      }}
    >
      <SuspenseOutlet />
      <Modal
        opened={deleteModal.status}
        onClose={handleDeleteModalClose}
        title="Delete Confirmation"
        centered
        zIndex={201}
      >
        <form onSubmit={handleSubmit(deleteHandler)}>
          <TextInput
            withAsterisk
            label='Are you sure about it? If yes then type "DELETE"'
            placeholder="DELETE"
            {...register("confirmation")}
            error={errors.confirmation?.message}
            mb="md"
          />
          <Group gap="xs">
            <Button
              type="button"
              variant="filled"
              color="dark"
              onClick={handleDeleteModalClose}
            >
              Cancel
            </Button>
            <Button type="submit" variant="filled" color="red">
              Delete
            </Button>
          </Group>
        </form>
      </Modal>
    </DeleteContext.Provider>
  );
};

export default DeleteProvider;
