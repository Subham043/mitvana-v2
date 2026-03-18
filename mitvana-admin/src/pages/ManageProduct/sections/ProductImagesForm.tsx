import FileDropZone from "@/components/FileDropZone";
import type { ProductFormValuesType } from "@/utils/data/schema/product";
import type { ProductType } from "@/utils/types";
import { Box, Divider, Input, Paper, Title } from "@mantine/core";
import { Controller, useFormContext } from "react-hook-form";

function ProductImagesForm({
  type,
  data,
}: {
  type: "add" | "edit" | "clone";
  data?: ProductType;
}) {
  const { control } = useFormContext<ProductFormValuesType>();
  return (
    <>
      <Paper shadow="xs" withBorder mt="md">
        <Box p="sm" pos="relative">
          <Title order={4}>Product Thumbnail</Title>
          <Input.Description>
            Only .webp, .png, .jpg and .jpeg files are allowed. Maximum file
            size is 5MB. Image should be not exceed the height of 800px. For
            best quality image use size 183 x 240.
          </Input.Description>
        </Box>
        <Divider />
        <Box p="sm" pos="relative">
          <Controller
            control={control}
            name="thumbnail"
            render={({ field, fieldState }) => (
              <Input.Wrapper error={fieldState.error?.message}>
                <FileDropZone
                  existingFiles={
                    type === "edit" && data?.thumbnail_link
                      ? [
                          {
                            id: undefined,
                            image_id: data.id,
                            url: data.thumbnail_link,
                          },
                        ]
                      : []
                  }
                  field={field.value ? ([field.value] as File[]) : []}
                  onChange={(files) => field.onChange(files[0])}
                  multiple={false}
                  hasDelete={false}
                />
              </Input.Wrapper>
            )}
          />
        </Box>
      </Paper>
      <Paper shadow="xs" withBorder mt="md">
        <Box p="sm" pos="relative">
          <Title order={4}>Product Images</Title>
          <Input.Description>
            Only .webp, .png, .jpg and .jpeg files are allowed. Maximum file
            size is 5MB. Image should be not exceed the height of 800px. For
            best quality image use size 183 x 240.
          </Input.Description>
        </Box>
        <Divider />
        <Box p="sm" pos="relative">
          <Controller
            control={control}
            name="images"
            render={({ field, fieldState }) => (
              <Input.Wrapper error={fieldState.error?.message}>
                <FileDropZone
                  existingFiles={
                    type === "edit" && data?.product_images
                      ? data.product_images.map((image) => ({
                          id: data.id,
                          image_id: image.id,
                          url: image.image_link,
                        }))
                      : []
                  }
                  field={
                    field.value && field.value.length > 0
                      ? (field.value.filter(
                          (image) => image !== undefined,
                        ) as File[])
                      : []
                  }
                  onChange={field.onChange}
                  multiple={true}
                />
              </Input.Wrapper>
            )}
          />
        </Box>
      </Paper>
    </>
  );
}

export default ProductImagesForm;
