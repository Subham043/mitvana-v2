import type { ProductFormValuesType } from "@/utils/data/schema/product";
import {
  Box,
  Divider,
  Group,
  Paper,
  SegmentedControl,
  TextInput,
  Title,
} from "@mantine/core";
import { Controller, useFormContext, useWatch } from "react-hook-form";

function ProductNotificationInfoForm() {
  const { control } = useFormContext<ProductFormValuesType>();

  const bought_text = useWatch({
    control: control,
    name: "bought_text",
  });

  return (
    <Paper shadow="xs" withBorder mt="md">
      <Box p="sm" pos="relative">
        <Group justify="space-between" gap={10}>
          <Title order={4}>Product Notification</Title>
          <Controller
            control={control}
            name="bought_text"
            render={({ field }) => (
              <SegmentedControl
                data={[
                  { label: "Not Display", value: "notDisplay" },
                  { label: "Automatic", value: "automatic" },
                  { label: "Manual", value: "manual" },
                ]}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Group>
      </Box>
      {bought_text === "manual" && (
        <>
          <Divider />
          <Box p="sm" pos="relative">
            <Controller
              control={control}
              name="product_bought"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Manual Text"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  withAsterisk
                />
              )}
            />
          </Box>
        </>
      )}
    </Paper>
  );
}

export default ProductNotificationInfoForm;
