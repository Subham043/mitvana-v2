import { useDeleteConfirmation } from "@/hooks/useDeleteConfirmation";
import { useProductImageDeleteMutation } from "@/utils/data/mutation/products";
import {
  ActionIcon,
  Box,
  Center,
  Group,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { IconPhoto, IconTrash } from "@tabler/icons-react";
import { useCallback } from "react";
import Dropzone from "react-dropzone";
import { PhotoProvider, PhotoView } from "react-photo-view";

interface FileDropZoneProps {
  existingFiles?: {
    id: string | undefined;
    image_id: string | undefined;
    url: string;
  }[];
  field: File[];
  onChange: (files: File[]) => void;
  multiple?: boolean;
  hasDelete?: boolean;
}

const ExistingFilesDelete = ({
  id,
  image_id,
}: {
  id: string;
  image_id: string;
}) => {
  const { handleDeleteModalOpen } = useDeleteConfirmation();
  const imageDelete = useProductImageDeleteMutation(id, image_id);
  const onDelete = useCallback(async () => {
    await imageDelete.mutateAsync();
  }, [imageDelete.mutateAsync]);
  return (
    <Group justify="flex-end">
      <ActionIcon
        variant="outline"
        color="red"
        size="sm"
        aria-label="Delete"
        onClick={() => handleDeleteModalOpen(onDelete)}
        disabled={imageDelete.isPending}
        loading={imageDelete.isPending}
      >
        <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>
    </Group>
  );
};

function FileDropZone({
  field,
  existingFiles = [],
  onChange,
  multiple = false,
  hasDelete = true,
}: FileDropZoneProps) {
  return (
    <Dropzone
      onDrop={(acceptedFiles) => {
        onChange([...(field || []), ...acceptedFiles]);
      }}
      multiple={multiple}
      maxSize={5000000}
      accept={{
        "image/*": [".png", ".jpg", ".jpeg", ".webp"],
      }}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <Box w="100%" h="100%" style={{ cursor: "pointer" }}>
          <div
            {...getRootProps()}
            style={{
              width: "100%",
              height: "200px",
              backgroundColor: isDragActive
                ? "var(--mantine-color-blue-0)"
                : "var(--mantine-color-gray-0)",
              border: "1px dashed var(--mantine-color-gray-3)",
              borderRadius: "10px",
              borderColor: isDragActive
                ? "var(--mantine-color-blue-4)"
                : "var(--mantine-color-gray-3)",
            }}
          >
            <input {...getInputProps()} />
            <Center h="100%">
              <Input.Placeholder>
                <Stack align="center" gap="xs">
                  <IconPhoto size={40} />
                  {isDragActive ? (
                    <Text size="sm">Drop files here</Text>
                  ) : (
                    <Text size="sm">
                      Drag 'n' drop some files here, or click to select files
                    </Text>
                  )}
                </Stack>
              </Input.Placeholder>
            </Center>
          </div>
          {(existingFiles.length > 0 || field.length > 0) && (
            <>
              {/* <Divider /> */}
              <Box pos="relative" mt="sm">
                <PhotoProvider maskOpacity={0.5}>
                  <SimpleGrid cols={{ base: 1, sm: 1, md: 6, lg: 8 }}>
                    {existingFiles &&
                      existingFiles.length > 0 &&
                      existingFiles.map((image, index) => {
                        return (
                          <Box
                            key={`existing-${index}`}
                            bd="1px dashed var(--mantine-color-gray-3)"
                            p="xs"
                            bdrs="md"
                            pos="relative"
                            style={{ cursor: "pointer" }}
                          >
                            {hasDelete && image.id && image.image_id && (
                              <ExistingFilesDelete
                                id={image.id}
                                image_id={image.image_id}
                              />
                            )}
                            <PhotoView src={image.url}>
                              <Image src={image.url} />
                            </PhotoView>
                          </Box>
                        );
                      })}
                    {field
                      .filter((image) => image !== undefined)
                      .map((image, index) => {
                        const imageUrl = URL.createObjectURL(image as Blob);
                        return (
                          <Box
                            key={`field-${index}`}
                            bd="1px dashed var(--mantine-color-gray-3)"
                            p="xs"
                            bdrs="md"
                            pos="relative"
                            style={{ cursor: "pointer" }}
                          >
                            {hasDelete && (
                              <Group justify="flex-end">
                                <ActionIcon
                                  variant="outline"
                                  color="red"
                                  size="sm"
                                  aria-label="Delete"
                                  onClick={() => {
                                    onChange(
                                      field.filter((_, i) => i !== index),
                                    );
                                  }}
                                >
                                  <IconTrash
                                    style={{ width: "70%", height: "70%" }}
                                    stroke={1.5}
                                  />
                                </ActionIcon>
                              </Group>
                            )}
                            <PhotoView src={imageUrl}>
                              <Image src={imageUrl} />
                            </PhotoView>
                          </Box>
                        );
                      })}
                  </SimpleGrid>
                </PhotoProvider>
              </Box>
            </>
          )}
        </Box>
      )}
    </Dropzone>
  );
}

export default FileDropZone;
