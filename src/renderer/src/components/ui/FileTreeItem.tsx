import { FileTree } from "@renderer/features/FileTree";
import type { FileTreeNode } from "@renderer/lib/fileTree";
import { useState } from "react";
import { Button } from "./Button";
import { FolderButton } from "./FolderButton";

export type FileTreeItemProps = {
  node: FileTreeNode;
  activePage: string | null;
  onPageSelect: (path: string) => void;
  depth: number;
};

export const FileTreeItem = ({ node, activePage, onPageSelect, depth }: FileTreeItemProps) => {
  const [_open, _setOpen] = useState(true);
  const isActive = activePage === node.path;

  if (node.isFile) {
    return (
      <Button
        label={node.name}
        onClick={() => onPageSelect(node.path)}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        className={`text-left ${isActive ? "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
      />
    );
  }

  return (
    <FolderButton name={node.name} depth={depth}>
      <FileTree
        nodes={node.children}
        activePage={activePage}
        onPageSelect={onPageSelect}
        depth={depth + 1}
      />
    </FolderButton>
  );
};
