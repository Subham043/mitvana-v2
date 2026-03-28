import { useOrderToggleStatusMutation } from "@/utils/data/mutation/orders";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Group, Modal, Textarea } from "@mantine/core";
import { IconCancel } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

export const reasonStatusSchema = yup
  .object({
    cancellation_reason: yup
      .string()
      .required("Cancellation reason is required"),
  })
  .required();

type ReasonStatusFormValuesType = yup.InferType<typeof reasonStatusSchema>;

const reasonFormDefaultValues = {
  cancellation_reason: "",
};

const OrderViewCancelBtn = ({
  id,
  status,
}: {
  id: string;
  status:
    | "Order Placed"
    | "Order Created"
    | "Payment Failed"
    | "On Hold"
    | "Processing"
    | "Dispatched"
    | "In Transit"
    | "Out for Delivery"
    | "Delivered"
    | "Cancelled by Admin"
    | "Cancelled By user"
    | "Refunded"
    | "Failed";
}) => {
  const orderToggleStatus = useOrderToggleStatusMutation(id);

  const form = useForm<ReasonStatusFormValuesType>({
    resolver: yupResolver(reasonStatusSchema),
    defaultValues: reasonFormDefaultValues,
  });

  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    if (modal) {
      form.reset(reasonFormDefaultValues);
    }
  }, [modal]);

  const handleClose = useCallback(() => {
    form.reset(reasonFormDefaultValues);
    setModal(false);
  }, [form.reset, setModal]);

  const handleOpen = useCallback(() => {
    setModal(true);
  }, [setModal]);

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      await orderToggleStatus.mutateAsync(
        {
          status: "Cancelled by Admin",
          cancellation_reason: values.cancellation_reason,
        },
        {
          onSuccess: () => {
            handleClose();
          },
        },
      );
    }),
    [modal, form.handleSubmit, orderToggleStatus.mutateAsync, handleClose],
  );

  const isCancelable =
    status === "Order Placed" ||
    status === "Order Created" ||
    status === "On Hold" ||
    status === "Processing" ||
    status === "Dispatched" ||
    status === "In Transit" ||
    status === "Out for Delivery";

  if (!isCancelable) {
    return null;
  }

  return (
    <>
      <Button
        leftSection={<IconCancel size={16} />}
        variant="filled"
        color="red"
        type="button"
        onClick={handleOpen}
      >
        Cancel Order
      </Button>
      <Modal
        opened={modal}
        onClose={handleClose}
        title="Cancel Order"
        // overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        size="sm"
      >
        <Box pos="relative">
          <form onSubmit={onSubmit}>
            <Controller
              control={form.control}
              name="cancellation_reason"
              render={({ field, fieldState }) => (
                <Textarea
                  label="Cancellation Reason"
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
                disabled={orderToggleStatus.isPending}
                loading={orderToggleStatus.isPending}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="filled"
                color="red"
                onClick={handleClose}
              >
                Close
              </Button>
            </Group>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default OrderViewCancelBtn;
