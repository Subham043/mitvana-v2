import {
  ActionIcon,
  Box,
  Button,
  FileInput,
  Group,
  Menu,
  Modal,
  TextInput,
} from "@mantine/core";
import {
  IconLinkPlus,
  IconPhotoPlus,
  IconPhotoUp,
  IconUpload,
} from "@tabler/icons-react";
import { type Editor } from "@tiptap/react";
import { useCallback, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import type { ModalProps, TexteditorImageType } from "@/utils/types";
import { useToast } from "@/hooks/useToast";
import { api_routes } from "@/utils/routes/api_routes";
import axios from "@/utils/axios";

const imageUploadViaUrlSchema = yup
  .object()
  .shape({
    url: yup
      .string()
      .typeError("Image URL must contain numbers only")
      .url("Please enter a valid image url")
      .required("Image URL is required"),
  })
  .required();

const imageUploadViaFileSchema = yup
  .object()
  .shape({
    image: yup
      .mixed()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .test("fileRequired", "Image file is required", (value: any) => {
        return value !== undefined;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .test(
        "fileSize",
        "Image file size should be less than 3MB",
        (value: any) => {
          if (value !== undefined) {
            return value.size <= 3000000;
          }
          return false;
        }
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .test("fileFormat", "Please select a valid image file", (value: any) => {
        if (value !== undefined) {
          return ["image/png", "image/jpeg", "image/jpg"].includes(value.type);
        }
        return false;
      })
      .transform((value) => {
        if (value !== undefined) {
          return value as Blob;
        }
        return undefined;
      }),
  })
  .required();

const ImageURLUpload = ({
  addImageUrl,
  handleModalClose,
}: {
  addImageUrl: (url: string) => void;
  handleModalClose: () => void;
}) => {
  const { handleSubmit, getValues, control, reset } = useForm({
    resolver: yupResolver(imageUploadViaUrlSchema),
    values: {
      url: "",
    },
  });

  const onCancel = () => {
    reset({ url: "" });
    handleModalClose();
  };

  const onSave = () => {
    const url = getValues("url");
    addImageUrl(url);
    onCancel();
  };

  return (
    <Box>
      <Controller
        name="url"
        control={control}
        render={({ field, fieldState }) => (
          <TextInput
            label="Image URL"
            placeholder="Enter Image URL"
            withAsterisk
            flex={1}
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />
      <Group gap="xs" align="center" mt="sm">
        <Button
          variant="filled"
          type="button"
          size="xs"
          onClick={handleSubmit(onSave)}
        >
          Upload
        </Button>
        <Button
          variant="outline"
          color="red"
          type="button"
          size="xs"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Group>
    </Box>
  );
};

const ImageFileUpload = ({
  addImageUrl,
  handleModalClose,
}: {
  addImageUrl: (url: string) => void;
  handleModalClose: () => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { toastError } = useToast();
  const [resetKey, setResetKey] = useState(0);

  const { handleSubmit, getValues, control, reset } = useForm({
    resolver: yupResolver(imageUploadViaFileSchema),
    values: {
      image: undefined,
    },
  });

  const onCancel = () => {
    reset({ image: undefined });
    setResetKey((prev) => prev + 1);
    handleModalClose();
  };

  const onSave = async () => {
    setLoading(true);
    try {
      const values = getValues();
      const formData = new FormData();
      const image = values.image as File | undefined;

      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post<{ data: TexteditorImageType }>(
        api_routes.textEditor.imageUpload,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      addImageUrl(response.data.data.image_link);
      onCancel();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toastError(error?.response?.data.message || "Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Controller
        name="image"
        control={control}
        render={({ field, fieldState }) => (
          <FileInput
            clearable
            label="Image File"
            withAsterisk
            leftSection={<IconPhotoPlus size={18} stroke={1.5} />}
            placeholder="Select to a photo to upload"
            accept="image/png,image/jpeg,image/jpg"
            error={fieldState.error?.message}
            key={resetKey}
            onChange={(payload) => {
              field.onChange(payload);
            }}
          />
        )}
      />
      <Group gap="xs" align="center" mt="sm">
        <Button
          variant="filled"
          type="button"
          size="xs"
          onClick={handleSubmit(onSave)}
          loading={loading}
          disabled={loading}
        >
          Upload
        </Button>
        <Button
          variant="outline"
          color="red"
          type="button"
          size="xs"
          disabled={loading}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Group>
    </Box>
  );
};

export default function ImageButton({ editor }: { editor: Editor }) {
  const [modal, setModal] = useState<ModalProps<{ type: "url" | "file" }>>({
    show: false,
  });

  const handleModalClose = useCallback(() => setModal({ show: false }), []);

  const addImageUrl = useCallback(
    (url: string) => {
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
        handleModalClose();
      }
    },
    [editor, handleModalClose]
  );

  if (!editor) {
    return null;
  }

  return (
    <>
      <Menu shadow="md" position="bottom" arrowPosition="center">
        <Menu.Target>
          <ActionIcon
            variant={"outline"}
            aria-label="Image Upload"
            type="button"
          >
            <IconPhotoUp style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconUpload size={14} />}
            onClick={() => setModal({ show: true, type: "file" })}
          >
            Upload from computer
          </Menu.Item>
          <Menu.Item
            leftSection={<IconLinkPlus size={14} />}
            onClick={() => setModal({ show: true, type: "url" })}
          >
            Insert via URL
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Modal
        opened={modal.show}
        onClose={handleModalClose}
        title="Upload Image"
      >
        {modal.show && modal.type === "url" && (
          <ImageURLUpload
            addImageUrl={addImageUrl}
            handleModalClose={handleModalClose}
          />
        )}
        {modal.show && modal.type === "file" && (
          <ImageFileUpload
            addImageUrl={addImageUrl}
            handleModalClose={handleModalClose}
          />
        )}
      </Modal>
    </>
  );
}
