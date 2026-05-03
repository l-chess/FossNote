import { Button } from "@renderer/components/ui/Button";
import { FolderButton } from "@renderer/components/ui/FolderButton";
import { Options } from "@renderer/components/ui/Options";
import { FileTree } from "@renderer/features/FileTree";
import type { FileTreeNode } from "@renderer/lib/fileTree";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { TbTrash } from "react-icons/tb";

export type FileTreeItemProps = {
  node: FileTreeNode;
  activePage: string | null;
  onPageSelect: (path: string) => void;
  onDeletePage: (pageName: string) => void;
  onDeleteFolder: (folderName: string) => void;
  depth: number;
};

export const FileTreeItem = ({
  node,
  activePage,
  onPageSelect,
  onDeletePage,
  onDeleteFolder,
  depth,
}: FileTreeItemProps) => {
  const isActive = activePage === node.path;
  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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
              label={node.isFile ? "Delete Page" : "Delete Folder"}
              icon={<TbTrash />}
              onClick={() => {
                node.isFile ? onDeletePage(node.path) : onDeleteFolder(node.path);
                setMenuPos(null);
              }}
              className="w-full text-left"
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
        />
        {contextMenu}
      </>
    );
  }

  return (
    <>
      <FolderButton name={node.name} depth={depth} onContextMenu={handleContextMenu}>
        <FileTree
          nodes={node.children}
          activePage={activePage}
          onPageSelect={onPageSelect}
          onDeletePage={onDeletePage}
          onDeleteFolder={onDeleteFolder}
          depth={depth + 1}
        />
      </FolderButton>
      {contextMenu}
    </>
  );
};
