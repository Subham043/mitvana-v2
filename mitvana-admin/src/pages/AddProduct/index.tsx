import { Controller, useWatch } from "react-hook-form";
import {
  Box,
  Button,
  Group,
  TextInput,
  Textarea,
  Switch,
  FileInput,
  Paper,
  Title,
  Divider,
  SimpleGrid,
  SegmentedControl,
  Input,
} from "@mantine/core";
import { useAddProductForm } from "./useAddProductForm";
import { useNavigate } from "react-router";
import { useCallback } from "react";
import SelectSinglePublishedProduct from "@/components/SelectSinglePublishedProduct";

/*
 * Tag Form Drawer
 */
export default function AddProduct() {
  const { form, loading, onSubmit } = useAddProductForm();
  const navigate = useNavigate();

  const variant = useWatch({
    control: form.control,
    name: "variant",
  });
  const bought_text = useWatch({
    control: form.control,
    name: "bought_text",
  });

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <form onSubmit={onSubmit}>
      <Paper shadow="xs" withBorder>
        <Box p="sm" pos="relative">
          <Title order={4}>Product Information</Title>
        </Box>
        <Divider />
        <Box p="sm" pos="relative">
          <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 3 }}>
            <Controller
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <Textarea
                label="Description"
                withAsterisk
                rows={5}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                mt="md"
              />
            )}
          />
          <Controller
            control={form.control}
            name="how_to_use"
            render={({ field, fieldState }) => (
              <Textarea
                label="How to Use"
                rows={5}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                mt="md"
              />
            )}
          />
          <Controller
            name="thumbnail"
            control={form.control}
            render={({ field, fieldState }) => (
              <FileInput
                clearable
                withAsterisk
                label="Thumbnail"
                placeholder="Click to upload thumbnail"
                accept="image/webp,image/png,image/jpeg,image/jpg"
                description="Only .webp, .png, .jpg and .jpeg files are allowed. Maximum file size is 5MB. Image should be not exceed the height of 800px. For best quality image use size 183 x 240."
                error={fieldState.error?.message}
                mt="md"
                onChange={(payload) =>
                  field.onChange(payload ? payload : undefined)
                }
              />
            )}
          />
          <Controller
            name="is_draft"
            control={form.control}
            render={({ field, fieldState }) => (
              <Switch
                label="Is Draft?"
                checked={field.value === true ? true : false}
                onChange={field.onChange}
                error={fieldState.error?.message}
                mt="md"
              />
            )}
          />
        </Box>
      </Paper>
      <Paper shadow="xs" withBorder mt="md">
        <Box p="sm" pos="relative">
          <Title order={4}>Inventory Information</Title>
        </Box>
        <Divider />
        <Box p="sm" pos="relative">
          <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 4 }}>
            <Controller
              control={form.control}
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
              control={form.control}
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
              control={form.control}
              name="tax"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Tax Percentage"
                  type="number"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  withAsterisk
                />
              )}
            />
            <Controller
              control={form.control}
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
      <Paper shadow="xs" withBorder mt="md">
        <Box p="sm" pos="relative">
          <Title order={4}>Other Information</Title>
        </Box>
        <Divider />
        <Box p="sm" pos="relative">
          <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 3 }}>
            <Controller
              control={form.control}
              name="product_selected"
              render={({ field, fieldState }) => (
                <Input.Wrapper
                  label="Select Existing Product"
                  error={fieldState.error?.message}
                >
                  <Input.Description mb="xs">
                    Select Only if current project is varient of some product
                  </Input.Description>
                  <SelectSinglePublishedProduct
                    selected={
                      field.value && field.value.value && field.value.label
                        ? (field.value as { value: string; label: string })
                        : undefined
                    }
                    setSelected={field.onChange}
                  />
                </Input.Wrapper>
              )}
            />
          </SimpleGrid>
        </Box>
      </Paper>
      <Paper shadow="xs" withBorder mt="md">
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Product Variant</Title>
            <Controller
              control={form.control}
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
            />
          </Group>
        </Box>
        <Divider />
        <Box p="sm" pos="relative">
          {variant === "size" && (
            <Controller
              control={form.control}
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
        </Box>
      </Paper>
      <Paper shadow="xs" withBorder mt="md">
        <Box p="sm" pos="relative">
          <Group justify="space-between" gap={10}>
            <Title order={4}>Product Notification</Title>
            <Controller
              control={form.control}
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
                control={form.control}
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
      <Paper shadow="xs" withBorder mt="md">
        <Box p="sm" pos="relative">
          <Title order={4}>Seo Information</Title>
        </Box>
        <Divider />
        <Box p="sm" pos="relative">
          <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }}>
            <Controller
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
          <Controller
            control={form.control}
            name="og_site_name"
            render={({ field, fieldState }) => (
              <TextInput
                label="OG Site Name"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
                mt="md"
              />
            )}
          />
        </Box>
      </Paper>
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
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Group>
    </form>
  );
}
