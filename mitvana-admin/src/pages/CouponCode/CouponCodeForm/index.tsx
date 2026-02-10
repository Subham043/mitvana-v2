import { Controller } from "react-hook-form";
import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Drawer,
  TextInput,
} from "@mantine/core";
import type { ExtendedModalProps } from "@/utils/types";
import { useCouponCodeForm } from "./useCouponCodeForm";
import dayjs from "dayjs";

type Props = {
  modal: ExtendedModalProps<{ id: string }>;
  handleModalClose: () => void;
};

/*
 * Coupon Code Form Drawer
 */
export default function CouponCodeForm({ modal, handleModalClose }: Props) {
  const { form, isLoading, loading, onSubmit, handleClose } = useCouponCodeForm(
    {
      modal,
      closeModal: handleModalClose,
    },
  );

  return (
    <Drawer
      opened={modal.show}
      onClose={handleClose}
      title={`${modal.type === "create" ? "Create" : "Update"} Coupon Code`}
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
            name="code"
            render={({ field, fieldState }) => (
              <TextInput
                label="Code"
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
            name="discount_percentage"
            render={({ field, fieldState }) => (
              <TextInput
                label="Discount Percentage"
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
            name="maximum_redemptions"
            render={({ field, fieldState }) => (
              <TextInput
                label="Maximum Redemptions"
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
            name="expiration_date"
            render={({ field, fieldState }) => (
              <TextInput
                label="Expiration Date"
                type="date"
                value={dayjs(field.value).format("YYYY-MM-DD")}
                onChange={field.onChange}
                error={fieldState.error?.message}
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
