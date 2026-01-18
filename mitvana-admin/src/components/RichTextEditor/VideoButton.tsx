import { ActionIcon, Group, Menu, TextInput } from "@mantine/core";
import { IconCheck, IconVideoPlus, IconX } from "@tabler/icons-react";
import { type Editor } from "@tiptap/react";
import { useCallback, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

const schema = yup
  .object()
  .shape({
    url: yup
      .string()
      .typeError("Video URL must contain numbers only")
      .url("Please enter a valid video url")
      .required("Video URL is required"),
  })
  .required();

export default function VideoButton({ editor }: { editor: Editor }) {
  const [menuOpened, setMenuOpened] = useState(false);

  const { handleSubmit, getValues, control, reset } = useForm({
    resolver: yupResolver(schema),
    values: {
      url: "",
    },
  });

  const addYoutubeVideo = useCallback(() => {
    const url = getValues("url");

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt("640", 10)) || 640,
        height: Math.max(180, parseInt("480", 10)) || 480,
      });
      setMenuOpened(false)
    }
  }, [editor, getValues]);

  if (!editor) {
    return null;
  }

  return (
    <Menu
      shadow="md"
      width={405}
      opened={menuOpened}
      onClose={() => {
        setMenuOpened(false);
        reset({ url: "" });
      }}
      position="bottom"
      arrowPosition="center"
    >
      <Menu.Target>
        <ActionIcon
          variant={"outline"}
          aria-label="Video Upload"
          onClick={(event) => {
            event.preventDefault();
            if (!menuOpened) {
              setMenuOpened(true);
            } else {
              setMenuOpened(false);
            }
          }}
          type="button"
        >
          <IconVideoPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Group gap={10} align="flex-start">
          <Controller
            name="url"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                placeholder="Enter Video URL"
                withAsterisk
                flex={1}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
          <ActionIcon
            type="submit"
            variant="filled"
            aria-label="Settings"
            color="green"
            size="lg"
            onClick={handleSubmit(addYoutubeVideo)}
          >
            <IconCheck style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            type="button"
            variant="filled"
            aria-label="Settings"
            color="red"
            size="lg"
            onClick={() => setMenuOpened(false)}
          >
            <IconX style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Menu.Dropdown>
    </Menu>
  );
}
