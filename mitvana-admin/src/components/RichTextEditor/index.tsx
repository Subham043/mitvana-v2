import { Box, Divider, Paper } from "@mantine/core";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import classes from "./index.module.css";
import MenuBar from "./MenuBar";
import Link from "@tiptap/extension-link";
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import Youtube from '@tiptap/extension-youtube'
import { Dropcursor, Placeholder } from '@tiptap/extensions'
import Image from '@tiptap/extension-image'

const extensions = [
  StarterKit,
  Image, 
  Dropcursor,
  Subscript,
  Superscript,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Placeholder.configure({
    placeholder: 'Write something …',
  }),
  Youtube.configure({
    controls: false,
    nocookie: true,
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
    protocols: ["http", "https"],
    isAllowedUri: (url, ctx) => {
      try {
        // construct URL
        const parsedUrl = url.includes(":")
          ? new URL(url)
          : new URL(`${ctx.defaultProtocol}://${url}`);

        // use default validation
        if (!ctx.defaultValidate(parsedUrl.href)) {
          return false;
        }

        // disallowed protocols
        const disallowedProtocols = ["ftp", "file", "mailto"];
        const protocol = parsedUrl.protocol.replace(":", "");

        if (disallowedProtocols.includes(protocol)) {
          return false;
        }

        // only allow protocols specified in ctx.protocols
        const allowedProtocols = ctx.protocols.map((p) =>
          typeof p === "string" ? p : p.scheme
        );

        if (!allowedProtocols.includes(protocol)) {
          return false;
        }

        // disallowed domains
        const disallowedDomains = [
          "example-phishing.com",
          "malicious-site.net",
        ];
        const domain = parsedUrl.hostname;

        if (disallowedDomains.includes(domain)) {
          return false;
        }

        // all checks have passed
        return true;
      } catch {
        return false;
      }
    },
    shouldAutoLink: (url) => {
      try {
        // construct URL
        const parsedUrl = url.includes(":")
          ? new URL(url)
          : new URL(`https://${url}`);

        // only auto-link if the domain is not in the disallowed list
        const disallowedDomains = [
          "example-no-autolink.com",
          "another-no-autolink.com",
        ];
        const domain = parsedUrl.hostname;

        return !disallowedDomains.includes(domain);
      } catch {
        return false;
      }
    },
  }),
];

interface Props {
  initialValue: string;
  onChange: (editorData: string) => void;
  setText?: (editorData: string) => void;
}

const RichTextEditor: React.FC<Props> = ({ initialValue, onChange, setText }) => {
  const editor = useEditor({
    extensions,
    content: initialValue,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      if(setText){
        setText(editor.getText())
      }
    },
    editorProps: {
      attributes: {
        class: classes.editor,
      },
    },
  });

  // 🧠 Update editor content when initialValue changes
  useEffect(() => {
    if (editor && initialValue && initialValue !== editor.getHTML()) {
      editor.commands.setContent(initialValue);
    }
  }, [initialValue, editor]);

  return (
    <Paper withBorder>
      <Box pos="sticky" top="60px" bg="white" style={{zIndex: 100}}>
        <Box p="sm">
          <MenuBar editor={editor} />
        </Box>
        <Divider />
      </Box>
      <EditorContent editor={editor} />
    </Paper>
  );
};

export default RichTextEditor;
