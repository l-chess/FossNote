import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const Editor = () => {
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
  });

  return (
    <div className="max-w-screen mx-auto px-12 py-16 h-full">
      <EditorContent editor={editor} className="h-full text-base leading-7" />
    </div>
  );
};
