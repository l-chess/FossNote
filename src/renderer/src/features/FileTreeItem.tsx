import { Button } from "@renderer/components/ui/Button";
import { FolderButton } from "@renderer/components/ui/FolderButton";
import { FileTree } from "@renderer/features/FileTree";
import type { FileTreeNode } from "@renderer/lib/fileTree";
import { useState } from "react";

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
        className={`text-left mt-1 ${isActive ? "bg-hover dark:bg-hover-dark hover:bg-xhover dark:hover:bg-xhover-dark" : "hover:bg-hover dark:hover:bg-hover-dark"}`}
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
