import { Controller, useFieldArray, useWatch } from "react-hook-form";
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
  Table,
  ActionIcon,
} from "@mantine/core";
import { useAddProductForm } from "./useAddProductForm";
import { useNavigate } from "react-router";
import { useCallback } from "react";
import SelectSinglePublishedProduct from "@/components/SelectSinglePublishedProduct";
import SelectMultiplePublishedProduct from "@/components/SelectMultiplePublishedProduct";
import SelectMultipleTag from "@/components/SelectMultipleTag";
import SelectMultipleColor from "@/components/SelectMultipleColor";
import RichTextEditor from "@/components/RichTextEditor";
import SelectMultipleIngredient from "@/components/SelectMultipleIngredient";
import SelectMultipleCategory from "@/components/SelectMultipleCategory";
import { IconPlus, IconTrash } from "@tabler/icons-react";

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
  const is_draft = useWatch({
    control: form.control,
    name: "is_draft",
  });

  const {
    fields: faqsFields,
    append: appendFaqs,
    remove: removeFaqs,
  } = useFieldArray({
    control: form.control,
    name: "faqs",
    keyName: "id",
  });

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const addFaqs = useCallback(() => {
    appendFaqs({
      question: "",
      answer: "",
    });
  }, [appendFaqs]);

  const deleteFaqs = useCallback(
    (index: number) => {
      removeFaqs(index);
    },
    [removeFaqs],
  );

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
            control={form.control}
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
              control={form.control}
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
              control={form.control}
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
          <SimpleGrid cols={{ base: 1, sm: 1, md: 2, lg: 2 }}>
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
            <Controller
              control={form.control}
              name="related_products"
              render={({ field, fieldState }) => (
                <Input.Wrapper
                  label="Select Related Products"
                  error={fieldState.error?.message}
                >
                  <Input.Description mb="xs">
                    Select Only if current project is varient of some product
                  </Input.Description>
                  <SelectMultiplePublishedProduct
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
          {variant === "color" && (
            <Controller
              control={form.control}
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
          <Group justify="space-between" align="center" gap="md">
            <Title order={4}>Frequently Asked Questions</Title>
            <ActionIcon
              variant="outline"
              color="blue"
              aria-label="Add"
              onClick={() => addFaqs()}
            >
              <IconPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Box>
        {faqsFields && faqsFields.length > 0 && (
          <>
            <Divider />
            <Box pos="relative">
              <Table.ScrollContainer minWidth={800} p={undefined} m={undefined}>
                <Table horizontalSpacing="md">
                  <Table.Thead>
                    <Table.Tr bg={"var(--mantine-color-blue-light)"}>
                      <Table.Th>QUESTION</Table.Th>
                      <Table.Th>ANSWER</Table.Th>
                      <Table.Th w={10} />
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {faqsFields.map((field, index) => (
                      <Table.Tr key={field.id}>
                        <Table.Td>
                          <Controller
                            control={form.control}
                            name={`faqs.${index}.question`}
                            render={({ field, fieldState }) => (
                              <Textarea
                                placeholder="Question"
                                value={field.value}
                                onChange={field.onChange}
                                error={fieldState.error?.message}
                                rows={3}
                                withAsterisk
                              />
                            )}
                          />
                        </Table.Td>
                        <Table.Td>
                          <Controller
                            control={form.control}
                            name={`faqs.${index}.answer`}
                            render={({ field, fieldState }) => (
                              <Textarea
                                placeholder="Answer"
                                value={field.value}
                                onChange={field.onChange}
                                error={fieldState.error?.message}
                                rows={3}
                                withAsterisk
                              />
                            )}
                          />
                        </Table.Td>
                        <Table.Td>
                          <ActionIcon
                            variant="outline"
                            color="red"
                            aria-label="Delete"
                            onClick={() => deleteFaqs(index)}
                          >
                            <IconTrash
                              style={{ width: "70%", height: "70%" }}
                              stroke={1.5}
                            />
                          </ActionIcon>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Table.ScrollContainer>
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
              control={form.control}
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
        </Box>
      </Paper>
      <Group gap="xs" mt="md">
        <Button
          type="submit"
          variant="filled"
          color={is_draft ? "blue" : "green"}
          disabled={loading}
          loading={loading}
        >
          {is_draft ? "Save as Draft" : "Save"}
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
