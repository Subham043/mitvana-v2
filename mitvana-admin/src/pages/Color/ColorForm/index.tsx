import { Controller } from "react-hook-form";
import {
  Box,
  Button,
  ColorInput,
  Drawer,
  Group,
  LoadingOverlay,
  TextInput,
} from "@mantine/core";
import type { ExtendedModalProps } from "@/utils/types";
import { useColorForm } from "./useColorForm";

type Props = {
  modal: ExtendedModalProps<{ id: string }>;
  handleModalClose: () => void;
};

/*
 * Color Form Drawer
 */
export default function ColorForm({ modal, handleModalClose }: Props) {
  const { form, isLoading, loading, onSubmit, handleClose } = useColorForm({
    modal,
    closeModal: handleModalClose,
  });

  return (
    <Drawer
      opened={modal.show}
      onClose={handleClose}
      title={`${modal.type === "create" ? "Create" : "Update"} Color`}
      position="right"
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
            name="name"
            render={({ field, fieldState }) => (
              <TextInput
                label="Name"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                withAsterisk
                data-autofocus
              />
            )}
          />
          <Controller
            control={form.control}
            name="code"
            render={({ field, fieldState }) => (
              <ColorInput
                label="Code"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                withAsterisk
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
    </Drawer>
  );
}
