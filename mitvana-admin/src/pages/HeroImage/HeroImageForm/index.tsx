import { Controller } from "react-hook-form";
import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Textarea,
  FileInput,
} from "@mantine/core";
import type { ExtendedModalProps } from "@/utils/types";
import { useHeroImageForm } from "./useHeroImageForm";

type Props = {
  modal: ExtendedModalProps<{ id: string }>;
  handleModalClose: () => void;
};

/*
 * Tag Form Modal
 */
export default function HeroImageForm({ modal, handleModalClose }: Props) {
  const { form, isLoading, loading, onSubmit, handleClose } = useHeroImageForm({
    modal,
    closeModal: handleModalClose,
  });

  return (
    <Modal
      opened={modal.show}
      onClose={handleClose}
      title={`${modal.type === "create" ? "Create" : "Update"} Hero Image`}
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
            name="content"
            render={({ field, fieldState }) => (
              <Textarea
                label="Content"
                withAsterisk
                data-autofocus
                rows={5}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="image"
            control={form.control}
            render={({ field, fieldState }) => (
              <FileInput
                clearable
                withAsterisk={modal.type === "create"}
                label="Image"
                placeholder="Click to upload image"
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
    </Modal>
  );
}
