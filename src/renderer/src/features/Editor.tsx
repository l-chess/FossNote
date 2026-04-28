import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef } from "react";
import { Markdown } from "tiptap-markdown";

export type EditorProps = {
  vaultPath: string;
  pageName: string;
  onRename: (oldName: string, newName: string) => void;
  focusTitle?: boolean;
};

export const Editor = ({ vaultPath, pageName, onRename, focusTitle = false }: EditorProps) => {
  const displayName = pageName.split("/").pop() ?? pageName;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const editorRef = useRef<ReturnType<typeof useEditor>>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown,
      Placeholder.configure({
        placeholder: "Start writing…",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "outline-none min-h-full",
      },
      handleKeyDown: (_, event) => {
        if (event.key === "Tab") {
          event.preventDefault();
          editor?.commands.insertContent("\t");
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      const markdown = (editor.storage as any).markdown.getMarkdown();
      window.api.page.write(vaultPath, pageName, markdown);
    },
  });

  useEffect(() => {
    if (!editor) return;
    window.api.page.read(vaultPath, pageName).then((content) => {
      editor.commands.setContent(content);
    });
  }, [vaultPath, pageName, editor]);

  // Keep title in sync when page changes
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.textContent = displayName;
    }
  }, [displayName]);

  useEffect(() => {
    editorRef.current = editor;
  }, [editor]);

  useEffect(() => {
    if (focusTitle && titleRef.current) {
      titleRef.current.focus();
      const range = document.createRange();
      range.selectNodeContents(titleRef.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [focusTitle]);

  const handleTitleBlur = async () => {
    const newDisplayName = titleRef.current?.textContent?.trim();
    if (!newDisplayName || newDisplayName === displayName) return;

    // Rebuild full path with new name
    const parts = pageName.split("/");
    parts[parts.length - 1] = newDisplayName;
    const newPageName = parts.join("/");

    await window.api.page.rename(vaultPath, pageName, newPageName);
    onRename(pageName, newPageName);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      titleRef.current?.blur();
    }
    if (e.key === "Escape") {
      if (titleRef.current) titleRef.current.textContent = displayName;
      titleRef.current?.blur();
    }
  };

  return (
    <div className="max-w-screen mx-auto px-12 py-16 h-full">
      <h1
        ref={titleRef}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleTitleBlur}
        onKeyDown={handleTitleKeyDown}
        className="text-2xl font-bold focus:outline-none"
      >
        {displayName}
      </h1>
      <EditorContent editor={editor} className="h-full text-base leading-7" />
    </div>
  );
};
