import SelectMultipleTag from "@/components/SelectMultipleTag";
import type { ProductFormValuesType } from "@/utils/data/schema/product";
import {
  Box,
  Divider,
  Input,
  Paper,
  SimpleGrid,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";

function ProductSeoForm() {
  const { control } = useFormContext<ProductFormValuesType>();
  return (
    <Paper shadow="xs" withBorder mt="md">
      <Box p="sm" pos="relative">
        <Title order={4}>Seo Information</Title>
      </Box>
      <Divider />
      <Box p="sm" pos="relative">
        <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }}>
          <Controller
            control={control}
            name="tags"
            render={({ field, fieldState }) => (
              <Input.Wrapper
                label="Select Tags"
                error={fieldState.error?.message}
              >
                <SelectMultipleTag
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
          <Controller
            control={control}
            name="og_site_name"
            render={({ field, fieldState }) => (
              <TextInput
                label="OG Site Name"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }} mt="md">
          <Controller
            control={control}
            name="meta_description"
            render={({ field, fieldState }) => (
              <Textarea
                label="Meta Description"
                rows={5}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="twitter_description"
            render={({ field, fieldState }) => (
              <Textarea
                label="Twitter Description"
                rows={5}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }} mt="md">
          <Controller
            control={control}
            name="facebook_description"
            render={({ field, fieldState }) => (
              <Textarea
                label="Facebook Description"
                rows={5}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="custom_script"
            render={({ field, fieldState }) => (
              <Textarea
                label="Custom Script"
                rows={5}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
        </SimpleGrid>
      </Box>
    </Paper>
  );
}

export default ProductSeoForm;
