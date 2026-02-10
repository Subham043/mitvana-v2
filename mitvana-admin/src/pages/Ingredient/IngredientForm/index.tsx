import { Controller } from "react-hook-form";
import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Drawer,
  TextInput,
  Textarea,
  FileInput,
} from "@mantine/core";
import type { ExtendedModalProps } from "@/utils/types";
import { useIngredientForm } from "./useIngredientForm";

type Props = {
  modal: ExtendedModalProps<{ id: string }>;
  handleModalClose: () => void;
};

/*
 * Ingredient Form Drawer
 */
export default function IngredientForm({ modal, handleModalClose }: Props) {
  const { form, isLoading, loading, onSubmit, handleClose } = useIngredientForm(
    {
      modal,
      closeModal: handleModalClose,
    },
  );

  return (
    <Drawer
      opened={modal.show}
      onClose={handleClose}
      title={`${modal.type === "create" ? "Create" : "Update"} Ingredient`}
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      size="md"
      position="right"
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
            name="title"
            render={({ field, fieldState }) => (
              <TextInput
                label="Title"
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
            name="description"
            render={({ field, fieldState }) => (
              <Textarea
                label="Description"
                withAsterisk
                rows={5}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                mt="md"
              />
            )}
          />
          <Controller
            name="thumbnail"
            control={form.control}
            render={({ field, fieldState }) => (
              <FileInput
                clearable
                withAsterisk={modal.type === "create"}
                label="Thumbnail"
                placeholder="Click to upload thumbnail"
                accept="image/webp,image/png,image/jpeg,image/jpg"
                description="Only .webp, .png, .jpg and .jpeg files are allowed. Maximum file size is 5MB."
                error={fieldState.error?.message}
                mt="md"
                onChange={(payload) =>
                  field.onChange(payload ? payload : undefined)
                }
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
