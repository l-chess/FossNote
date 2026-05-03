import { Button } from "@renderer/components/ui/Button";
import { FolderButton } from "@renderer/components/ui/FolderButton";
import { Options } from "@renderer/components/ui/Options";
import { FileTree } from "@renderer/features/FileTree";
import type { FileTreeNode } from "@renderer/lib/fileTree";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { TbPencil, TbTrash } from "react-icons/tb";

export type FileTreeItemProps = {
  node: FileTreeNode;
  activePage: string | null;
  onPageSelect: (path: string) => void;
  onDeletePage: (pageName: string) => void;
  onDeleteFolder: (folderName: string) => void;
  onRenamePage: (oldName: string, newName: string) => void;
  onRenameFolder: (oldName: string, newName: string) => void;
  depth: number;
};

export const FileTreeItem = ({
  node,
  activePage,
  onPageSelect,
  onDeletePage,
  onDeleteFolder,
  onRenamePage,
  onRenameFolder,
  depth,
}: FileTreeItemProps) => {
  const isActive = activePage === node.path;
  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [renaming, setRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(node.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (renaming) {
      setTimeout(() => inputRef.current?.select(), 0);
    }
  }, [renaming]);

  const handleRenameConfirm = (_e?: React.FocusEvent<HTMLInputElement>) => {
    const trimmed = renameValue.trim();
    if (!trimmed || trimmed === node.name) {
      setRenaming(false);
      return;
    }

    if (node.isFile) {
      const parts = node.path.split("/");
      parts[parts.length - 1] = trimmed;
      onRenamePage(node.path, parts.join("/"));
    } else {
      const parts = node.path.split("/");
      parts[parts.length - 1] = trimmed;
      onRenameFolder(node.path, parts.join("/"));
    }

    setRenaming(false);
  };

  const handleRenameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleRenameConfirm();
    if (e.key === "Escape") {
      setRenameValue(node.name);
      setRenaming(false);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuPos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (!menuPos) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuPos(null);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [menuPos]);

  const contextMenu = menuPos
    ? createPortal(
        <div ref={menuRef} className="fixed z-50" style={{ top: menuPos.y, left: menuPos.x }}>
          <Options>
            <Button
              label="Rename"
              icon={<TbPencil />}
              onClick={() => {
                setRenameValue(node.name);
                setRenaming(true);
                setMenuPos(null);
              }}
              className="hover:bg-hover dark:hover:bg-hover-dark w-full text-left"
            />
            <Button
              label={node.isFile ? "Delete Page" : "Delete Folder"}
              icon={<TbTrash />}
              onClick={() => {
                node.isFile ? onDeletePage(node.path) : onDeleteFolder(node.path);
                setMenuPos(null);
              }}
              className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950 w-full text-left"
            />
          </Options>
        </div>,
        document.body,
      )
    : null;

  if (node.isFile) {
    return (
      <>
        <Button
          label={node.name}
          onClick={() => onPageSelect(node.path)}
          onContextMenu={handleContextMenu}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          className={`text-left mt-1 ${isActive ? "bg-hover dark:bg-hover-dark hover:bg-xhover dark:hover:bg-xhover-dark" : "hover:bg-hover dark:hover:bg-hover-dark"}`}
          renaming={renaming}
          inputProps={{
            ref: inputRef,
            value: renameValue,
            onChange: (e) => setRenameValue(e.target.value),
            onBlur: handleRenameConfirm,
            onKeyDown: handleRenameKeyDown,
          }}
        />
        {contextMenu}
      </>
    );
  }

  return (
    <>
      <FolderButton
        name={node.name}
        depth={depth}
        onContextMenu={handleContextMenu}
        renaming={renaming}
        inputProps={{
          ref: inputRef,
          value: renameValue,
          onChange: (e) => setRenameValue(e.target.value),
          onBlur: handleRenameConfirm,
          onKeyDown: handleRenameKeyDown,
        }}
      >
        <FileTree
          nodes={node.children}
          activePage={activePage}
          onPageSelect={onPageSelect}
          onDeletePage={onDeletePage}
          onDeleteFolder={onDeleteFolder}
          onRenamePage={onRenamePage}
          onRenameFolder={onRenameFolder}
          depth={depth + 1}
        />
      </FolderButton>
      {contextMenu}
    </>
  );
};
