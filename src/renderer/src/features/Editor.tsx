import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

export type EditorProps = {
  vaultPath: string;
  pageName: string;
};

export const Editor = ({ vaultPath, pageName }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing…",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "outline-none min-h-full",
      },
    },
    onUpdate: ({ editor }) => {
      window.api.page.write(vaultPath, pageName, editor.getText());
    },
  });

  useEffect(() => {
    if (!editor) return;
    window.api.page.read(vaultPath, pageName).then((content) => {
      editor.commands.setContent(content);
    });
  }, [vaultPath, pageName, editor]);

  return (
    <div className="max-w-screen mx-auto px-12 py-16 h-full">
      <EditorContent editor={editor} className="h-full text-base leading-7" />
    </div>
  );
};
