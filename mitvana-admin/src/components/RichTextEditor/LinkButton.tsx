import { ActionIcon, Group, Menu, TextInput } from "@mantine/core";
import { IconCheck, IconLink, IconX } from "@tabler/icons-react";
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
      .typeError("URL must contain numbers only")
      .url("Please enter a valid url")
      .required("URL is required"),
  })
  .required();

export default function LinkButton({
  editor,
  editorState,
}: {
  editor: Editor;
  editorState: { isLink: boolean };
}) {
  const [menuOpened, setMenuOpened] = useState(false);

  const { handleSubmit, getValues, control, reset } = useForm({
    resolver: yupResolver(schema),
    values: {
      url: editor.getAttributes("link").href
        ? editor.getAttributes("link").href
        : "",
    },
  });

  const setLink = useCallback(() => {

    // cancelled
    if (getValues("url") === null) {
      return;
    }

    // empty
    if (getValues("url") === "" || getValues("url").length===0) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setMenuOpened(false)
      return;
    }

    // update link
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: getValues("url") })
        .run();
      setMenuOpened(false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      alert(e.message);
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
        reset({url: ""})
      }}
      position="bottom"
      arrowPosition="center"
    >
      <Menu.Target>
        <ActionIcon
          variant={editorState.isLink ? "light" : "outline"}
          aria-label="Link"
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
          <IconLink style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Group gap={10} align="flex-start">
          <Controller
            name="url"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput placeholder="Enter URL" withAsterisk flex={1} value={field.value} onChange={field.onChange} error={fieldState.error?.message} />
            )}
          />
          <ActionIcon
            type="submit"
            variant="filled"
            aria-label="Settings"
            color="green"
            size="lg"
            onClick={handleSubmit(setLink)}
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
