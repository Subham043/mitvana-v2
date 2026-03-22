import type { ProductFormValuesType } from "@/utils/data/schema/product";
import {
  Box,
  Divider,
  Paper,
  SimpleGrid,
  TextInput,
  Title,
} from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";

function ProductInventoryForm() {
  const { control } = useFormContext<ProductFormValuesType>();
  return (
    <Paper shadow="xs" withBorder>
      <Box p="sm" pos="relative">
        <Title order={4}>Inventory Information</Title>
      </Box>
      <Divider />
      <Box p="sm" pos="relative">
        <SimpleGrid cols={{ base: 1, sm: 1, md: 1, lg: 1 }}>
          <Controller
            control={control}
            name="price"
            render={({ field, fieldState }) => (
              <TextInput
                label="Price"
                type="number"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                withAsterisk
              />
            )}
          />
          <Controller
            control={control}
            name="discounted_price"
            render={({ field, fieldState }) => (
              <TextInput
                label="Discounted Price"
                type="number"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                withAsterisk
              />
            )}
          />
          <Controller
            control={control}
            name="tax"
            render={({ field, fieldState }) => (
              <TextInput
                label="Tax (%)"
                type="number"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                withAsterisk
              />
            )}
          />
          <Controller
            control={control}
            name="stock"
            render={({ field, fieldState }) => (
              <TextInput
                label="Stock"
                type="number"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                withAsterisk
              />
            )}
          />
        </SimpleGrid>
      </Box>
    </Paper>
  );
}

export default ProductInventoryForm;
