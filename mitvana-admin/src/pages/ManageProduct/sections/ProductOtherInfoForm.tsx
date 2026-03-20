import SelectMultipleProduct from "@/components/SelectMultipleProduct";
import SelectSingleProduct from "@/components/SelectSingleProduct";
import type { ProductFormValuesType } from "@/utils/data/schema/product";
import { Box, Divider, Input, Paper, SimpleGrid, Title } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";

function ProductOtherInfoForm() {
  const { control } = useFormContext<ProductFormValuesType>();
  return (
    <Paper shadow="xs" withBorder mt="md">
      <Box p="sm" pos="relative">
        <Title order={4}>Other Information</Title>
      </Box>
      <Divider />
      <Box p="sm" pos="relative">
        <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }}>
          <Controller
            control={control}
            name="product_selected"
            render={({ field, fieldState }) => (
              <Input.Wrapper
                label="Select Existing Product"
                error={fieldState.error?.message}
              >
                <Input.Description mb="xs">
                  Select Only if current project is varient of some product
                </Input.Description>
                <SelectSingleProduct
                  selected={
                    field.value && field.value.value && field.value.label
                      ? (field.value as {
                          value: string;
                          label: string;
                        })
                      : undefined
                  }
                  setSelected={field.onChange}
                />
              </Input.Wrapper>
            )}
          />
          <Controller
            control={control}
            name="related_products"
            render={({ field, fieldState }) => (
              <Input.Wrapper
                label="Select Related Products"
                error={fieldState.error?.message}
              >
                <Input.Description mb="xs">
                  Select Only if current project is varient of some product
                </Input.Description>
                <SelectMultipleProduct
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
        </SimpleGrid>
      </Box>
    </Paper>
  );
}

export default ProductOtherInfoForm;
