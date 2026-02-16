import { Controller } from "react-hook-form";
import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Drawer,
  TextInput,
  Textarea,
  Input,
} from "@mantine/core";
import type { ExtendedModalProps } from "@/utils/types";
import { useOfferForm } from "./useOfferForm";
import SelectMultiplePublishedProduct from "@/components/SelectMultiplePublishedProduct";

type Props = {
  modal: ExtendedModalProps<{ id: string }>;
  handleModalClose: () => void;
};

/*
 * Offer Form Drawer
 */
export default function OfferForm({ modal, handleModalClose }: Props) {
  const { form, isLoading, loading, onSubmit, handleClose } = useOfferForm({
    modal,
    closeModal: handleModalClose,
  });

  return (
    <Drawer
      opened={modal.show}
      onClose={handleClose}
      title={`${modal.type === "create" ? "Create" : "Update"} Offer`}
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
                type="text"
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
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                rows={5}
                mt="md"
              />
            )}
          />
          <Controller
            control={form.control}
            name="discount_percentage"
            render={({ field, fieldState }) => (
              <TextInput
                label="Discount Percentage"
                type="number"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                withAsterisk
                mt="md"
              />
            )}
          />
          <Controller
            control={form.control}
            name="min_cart_value"
            render={({ field, fieldState }) => (
              <TextInput
                label="Minimum Cart Value"
                type="number"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                mt="md"
              />
            )}
          />
          <Controller
            control={form.control}
            name="max_discount"
            render={({ field, fieldState }) => (
              <TextInput
                label="Max Discount"
                type="number"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                mt="md"
              />
            )}
          />
          <Controller
            control={form.control}
            name="products"
            render={({ field, fieldState }) => (
              <Input.Wrapper
                label="Select Applicable Products"
                error={fieldState.error?.message}
                mt="md"
              >
                <SelectMultiplePublishedProduct
                  selected={
                    field.value && field.value.length > 0
                      ? (field.value.map((item) => ({
                          value: item.value,
                          label: item.label,
                        })) as { value: string; label: string }[])
                      : []
                  }
                  setSelected={field.onChange}
                />
              </Input.Wrapper>
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
