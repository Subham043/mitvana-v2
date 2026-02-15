import { ActionIcon, Group } from "@mantine/core";
import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBaselineDensityLarge,
  IconBlockquote,
  IconBold,
  IconCircleDashedLetterC,
  IconCircleDashedLetterP,
  IconClearFormatting,
  IconCode,
  IconCodeOff,
  IconGripHorizontal,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
  IconItalic,
  IconList,
  IconListLetters,
  IconStrikethrough,
  IconSubscript,
  IconSuperscript,
  IconUnderline,
  IconUnlink,
} from "@tabler/icons-react";
import { useEditorState, type Editor } from "@tiptap/react";
import LinkButton from "./LinkButton";
// import VideoButton from "./VideoButton";
// import ImageButton from "./ImageButton";

export default function MenuBar({ editor }: { editor: Editor }) {
  // Read the current editor's state, and re-render the component when it changes
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
        isLink: ctx.editor.isActive("link") ?? false,
        isSuperscript: ctx.editor.isActive("superscript") ?? false,
        isSubscript: ctx.editor.isActive("subscript") ?? false,
        isLeftAlign: ctx.editor.isActive({ textAlign: "left" }) ?? false,
        isRightAlign: ctx.editor.isActive({ textAlign: "right" }) ?? false,
        isCenterAlign: ctx.editor.isActive({ textAlign: "center" }) ?? false,
        isJustifyAlign: ctx.editor.isActive({ textAlign: "justify" }) ?? false,
      };
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <Group gap="xs" align="center">
      <ActionIcon.Group>
        <ActionIcon
          variant={editorState.isBold ? "light" : "outline"}
          aria-label="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          type="button"
        >
          <IconBold style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          variant={editorState.isItalic ? "light" : "outline"}
          aria-label="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          type="button"
        >
          <IconItalic style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          variant={"outline"}
          aria-label="Underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          type="button"
        >
          <IconUnderline style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          variant={editorState.isStrike ? "light" : "outline"}
          aria-label="StrikeThrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          type="button"
        >
          <IconStrikethrough
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
      </ActionIcon.Group>
      <ActionIcon.Group>
        <ActionIcon
          variant={editorState.isParagraph ? "light" : "outline"}
          aria-label="Paragraph"
          onClick={() => editor.chain().focus().setParagraph().run()}
          type="button"
        >
          <IconCircleDashedLetterP
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
        <ActionIcon
          variant={editorState.isHeading1 ? "light" : "outline"}
          aria-label="H1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          type="button"
        >
          <IconH1 style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          variant={editorState.isHeading2 ? "light" : "outline"}
          aria-label="H2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          type="button"
        >
          <IconH2 style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          variant={editorState.isHeading3 ? "light" : "outline"}
          aria-label="H3"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          type="button"
        >
          <IconH3 style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          variant={editorState.isHeading4 ? "light" : "outline"}
          aria-label="H4"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          type="button"
        >
          <IconH4 style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          variant={editorState.isHeading5 ? "light" : "outline"}
          aria-label="H5"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          type="button"
        >
          <IconH5 style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          variant={editorState.isHeading6 ? "light" : "outline"}
          aria-label="H6"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          type="button"
        >
          <IconH6 style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </ActionIcon.Group>
      <ActionIcon.Group>
        <ActionIcon
          variant={editorState.isLeftAlign ? "light" : "outline"}
          aria-label="Left Align"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          type="button"
        >
          <IconAlignLeft style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          variant={editorState.isCenterAlign ? "light" : "outline"}
          aria-label="Left Align"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          type="button"
        >
          <IconAlignCenter
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
        <ActionIcon
          variant={editorState.isRightAlign ? "light" : "outline"}
          aria-label="Left Align"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          type="button"
        >
          <IconAlignRight
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
        <ActionIcon
          variant={editorState.isJustifyAlign ? "light" : "outline"}
          aria-label="Left Align"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          type="button"
        >
          <IconAlignJustified
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
      </ActionIcon.Group>
      <ActionIcon.Group>
        <ActionIcon
          variant={editorState.isBulletList ? "light" : "outline"}
          aria-label="Bullet List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          type="button"
        >
          <IconList style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          variant={editorState.isOrderedList ? "light" : "outline"}
          aria-label="Ordered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          type="button"
        >
          <IconListLetters
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
      </ActionIcon.Group>
      <ActionIcon.Group>
        <ActionIcon
          variant={editorState.isSubscript ? "light" : "outline"}
          aria-label="Subscript"
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          type="button"
        >
          <IconSubscript style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          variant={editorState.isSuperscript ? "light" : "outline"}
          aria-label="Superscript"
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          type="button"
        >
          <IconSuperscript
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
      </ActionIcon.Group>
      <ActionIcon.Group>
        <LinkButton editorState={editorState} editor={editor} />
        <ActionIcon
          variant={"outline"}
          aria-label="Unlink"
          onClick={() => editor.chain().focus().unsetLink().run()}
          type="button"
          disabled={!editorState.isLink}
        >
          <IconUnlink style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </ActionIcon.Group>
      <ActionIcon.Group>
        <ActionIcon
          variant={editorState.isCode ? "light" : "outline"}
          aria-label="Code"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          type="button"
        >
          <IconCircleDashedLetterC
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
        <ActionIcon
          variant={editorState.isCodeBlock ? "light" : "outline"}
          aria-label="Code Block"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          type="button"
        >
          <IconCode style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          variant={editorState.isBlockquote ? "light" : "outline"}
          aria-label="Block Quote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          type="button"
        >
          <IconBlockquote
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
        <ActionIcon
          variant={"outline"}
          aria-label="Horizontal Rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          type="button"
        >
          <IconGripHorizontal
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
        <ActionIcon
          variant={"outline"}
          aria-label="Hard Break"
          onClick={() => editor.chain().focus().setHardBreak().run()}
          type="button"
        >
          <IconBaselineDensityLarge
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
      </ActionIcon.Group>
      <ActionIcon.Group>
        <ActionIcon
          variant={"outline"}
          aria-label="Clear Formatting"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          type="button"
        >
          <IconClearFormatting
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
        <ActionIcon
          variant={"outline"}
          aria-label="Clear Nodes"
          onClick={() => editor.chain().focus().clearNodes().run()}
          type="button"
        >
          <IconCodeOff style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </ActionIcon.Group>
      {/* <ActionIcon.Group>
       <ImageButton editor={editor} />
       <VideoButton editor={editor} />
      </ActionIcon.Group> */}
      <ActionIcon.Group>
        <ActionIcon
          variant={"outline"}
          aria-label="Undo"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
          type="button"
        >
          <IconArrowBackUp
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
        <ActionIcon
          variant={"outline"}
          aria-label="Redo"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
          type="button"
        >
          <IconArrowForwardUp
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
      </ActionIcon.Group>
    </Group>
  );
}
