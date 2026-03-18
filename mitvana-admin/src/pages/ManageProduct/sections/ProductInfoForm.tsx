import RichTextEditor from "@/components/RichTextEditor";
import SelectMultipleCategory from "@/components/SelectMultipleCategory";
import SelectMultipleIngredient from "@/components/SelectMultipleIngredient";
import type { ProductFormValuesType } from "@/utils/data/schema/product";
import {
  Box,
  Divider,
  Group,
  Input,
  Paper,
  SimpleGrid,
  Switch,
  TextInput,
  Title,
} from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";

function ProductInfoForm() {
  const { control } = useFormContext<ProductFormValuesType>();
  return (
    <Paper shadow="xs" withBorder>
      <Box p="sm" pos="relative">
        <Group justify="space-between" gap="xs" align="center">
          <Title order={4}>Product Information</Title>
          <Controller
            name="is_draft"
            control={control}
            render={({ field, fieldState }) => (
              <Switch
                offLabel="Draft"
                onLabel="Published"
                checked={field.value === true ? false : true}
                onChange={(e) => field.onChange(!e.target.checked)}
                error={fieldState.error?.message}
                size="lg"
              />
            )}
          />
        </Group>
      </Box>
      <Divider />
      <Box p="sm" pos="relative">
        <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 3 }}>
          <Controller
            control={control}
            name="title"
            render={({ field, fieldState }) => (
              <TextInput
                label="Title"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                withAsterisk
                data-autofocus
              />
            )}
          />
          <Controller
            control={control}
            name="slug"
            render={({ field, fieldState }) => (
              <TextInput
                label="Slug"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="sub_title"
            render={({ field, fieldState }) => (
              <TextInput
                label="Sub Title"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 3 }} mt="md">
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <TextInput
                label="Name"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="sku"
            render={({ field, fieldState }) => (
              <TextInput
                label="SKU"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="hsn"
            render={({ field, fieldState }) => (
              <TextInput
                label="HSN Code"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
        </SimpleGrid>
        <Controller
          control={control}
          name="description"
          render={({ field, fieldState }) => (
            <Input.Wrapper
              label="Description"
              withAsterisk
              error={fieldState.error?.message}
              mt="md"
            >
              <RichTextEditor
                initialValue={field.value}
                onChange={field.onChange}
              />
            </Input.Wrapper>
          )}
        />
        <Controller
          control={control}
          name="how_to_use"
          render={({ field, fieldState }) => (
            <Input.Wrapper
              label="How to Use"
              error={fieldState.error?.message}
              mt="md"
            >
              <RichTextEditor
                initialValue={field.value ? field.value : ""}
                onChange={field.onChange}
              />
            </Input.Wrapper>
          )}
        />
        <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }} mt="md">
          <Controller
            control={control}
            name="categories"
            render={({ field, fieldState }) => (
              <Input.Wrapper
                label="Select Categories"
                error={fieldState.error?.message}
              >
                <SelectMultipleCategory
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
            name="ingredients"
            render={({ field, fieldState }) => (
              <Input.Wrapper
                label="Select Ingredients"
                error={fieldState.error?.message}
              >
                <SelectMultipleIngredient
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

export default ProductInfoForm;
