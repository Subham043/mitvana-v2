import type { ProductFormValuesType } from "@/utils/data/schema/product";
import { Box, Divider, Group, Paper, TextInput, Title } from "@mantine/core";
import { Controller, useFormContext, useWatch } from "react-hook-form";

function ProductVariantInfoForm() {
  const { control } = useFormContext<ProductFormValuesType>();

  const variant = useWatch({
    control: control,
    name: "variant",
  });

  return (
    <Paper shadow="xs" withBorder mt="md">
      <Box p="sm" pos="relative">
        <Group justify="space-between" gap={10}>
          <Title order={4}>Product Variant</Title>
          {/* <Controller
            control={control}
            name="variant"
            render={({ field }) => (
              <SegmentedControl
                data={[
                  { label: "Size", value: "size" },
                  { label: "Color", value: "color" },
                ]}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          /> */}
        </Group>
      </Box>
      <Divider />
      <Box p="sm" pos="relative">
        {variant === "size" && (
          <Controller
            control={control}
            name="size_or_color"
            render={({ field, fieldState }) => (
              <TextInput
                label="Size"
                type="text"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                withAsterisk
              />
            )}
          />
        )}
        {/* {variant === "color" && (
          <Controller
            control={control}
            name="colors"
            render={({ field, fieldState }) => (
              <Input.Wrapper
                label="Select Colors"
                error={fieldState.error?.message}
              >
                <SelectMultipleColor
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
        )} */}
      </Box>
    </Paper>
  );
}

export default ProductVariantInfoForm;
