import { Controller } from "react-hook-form";
import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  TextInput,
} from "@mantine/core";
import type { ExtendedModalProps } from "@/utils/types";
import { useSubscriptionForm } from "./useSubscriptionForm";

type Props = {
  modal: ExtendedModalProps<{ id: string }>;
  handleModalClose: () => void;
};

/*
 * Subscription Form Drawer
 */
export default function SubscriptionForm({ modal, handleModalClose }: Props) {
  const { form, isLoading, loading, onSubmit, handleClose } =
    useSubscriptionForm({
      modal,
      closeModal: handleModalClose,
    });

  return (
    <Modal
      opened={modal.show}
      onClose={handleClose}
      title={`${modal.type === "create" ? "Create" : "Update"} Subscription`}
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      size="md"
    >
      <Box pos="relative">
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <form onSubmit={onSubmit}>
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <TextInput
                label="Email"
                type="email"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                withAsterisk
                data-autofocus
              />
            )}
          />
          <Group gap="xs" mt="md">
            <Button
              type="submit"
              variant="filled"
              color="blue"
              disabled={loading}
              loading={loading}
            >
              Save
            </Button>
            <Button
              type="button"
              variant="filled"
              color="red"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
}
