import { memo, useCallback, useEffect, useState } from "react";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ActionIcon, Button, Group, Select, Text } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import {
  orderStatusSchema,
  type OrderStatusFormValuesType,
} from "@/utils/data/schema/order";
import { useOrderToggleStatusMutation } from "@/utils/data/mutation/orders";

const StatusUpdateBtn = memo(
  ({
    status,
    id,
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
    const [editing, setEditing] = useState(false);

    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<OrderStatusFormValuesType>({
      resolver: yupResolver(
        orderStatusSchema,
      ) as Resolver<OrderStatusFormValuesType>,
      defaultValues: { status: status, cancellation_reason: "" },
    });

    /** ✅ Correct hydration */
    useEffect(() => {
      reset({ status: status, cancellation_reason: "" });
    }, [status, reset, editing]);

    const onSubmit = useCallback(
      handleSubmit(async (values) => {
        await orderToggleStatus.mutateAsync(
          {
            status: values.status,
            cancellation_reason: undefined,
          },
          {
            onSuccess: () => {
              setEditing(false);
            },
          },
        );
      }),
      [handleSubmit, orderToggleStatus.mutateAsync, setEditing],
    );

    const canNotUpdate = status === "Payment Failed";

    if (!editing) {
      return (
        <Button
          variant="transparent"
          w="fit-content"
          p={0}
          onClick={() => (!canNotUpdate ? setEditing(true) : undefined)}
          rightSection={!canNotUpdate ? <IconPencil size={16} /> : undefined}
        >
          {status}
        </Button>
      );
    }

    return (
      <form onSubmit={onSubmit}>
        <Group gap="xs">
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                data={[
                  { label: "Order Placed", value: "Order Placed" },
                  { label: "Order Created", value: "Order Created" },
                  { label: "Payment Failed", value: "Payment Failed" },
                  { label: "On Hold", value: "On Hold" },
                  { label: "Processing", value: "Processing" },
                  { label: "Dispatched", value: "Dispatched" },
                  { label: "In Transit", value: "In Transit" },
                  { label: "Out for Delivery", value: "Out for Delivery" },
                  { label: "Delivered", value: "Delivered" },
                  { label: "Refunded", value: "Refunded" },
                  { label: "Failed", value: "Failed" },
                ]}
                {...field}
                defaultDropdownOpened={true}
              />
            )}
          />
          <ActionIcon
            type="submit"
            color="green"
            loading={orderToggleStatus.isPending}
          >
            <IconCheck size={18} />
          </ActionIcon>
          <ActionIcon
            type="button"
            color="red"
            onClick={() => {
              reset({ status: status, cancellation_reason: "" });
              setEditing(false);
            }}
          >
            <IconX size={18} />
          </ActionIcon>
        </Group>
        {errors.status && (
          <Text c="red" size="xs">
            {errors.status.message}
          </Text>
        )}
      </form>
    );
  },
);

export default StatusUpdateBtn;
