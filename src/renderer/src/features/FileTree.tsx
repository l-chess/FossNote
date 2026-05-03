import type { FileTreeNode } from "@renderer/lib/fileTree";
import { FileTreeItem } from "./FileTreeItem";

export type FileTreeProps = {
  nodes: FileTreeNode[];
  activePage: string | null;
  onPageSelect: (path: string) => void;
  onDeletePage: (pageName: string) => void;
  onDeleteFolder: (folderName: string) => void;
  onRenamePage: (oldName: string, newName: string) => void;
  onRenameFolder: (oldName: string, newName: string) => void;
  depth?: number;
};

export const FileTree = ({
  nodes,
  activePage,
  onPageSelect,
  onDeletePage,
  onDeleteFolder,
  onRenamePage,
  onRenameFolder,
  depth = 0,
}: FileTreeProps) => {
  return (
    <div>
      {nodes.map((node) => (
        <FileTreeItem
          key={node.path}
          node={node}
          activePage={activePage}
          onPageSelect={onPageSelect}
          onDeletePage={onDeletePage}
          onDeleteFolder={onDeleteFolder}
          onRenamePage={onRenamePage}
          onRenameFolder={onRenameFolder}
          depth={depth}
        />
      ))}
    </div>
  );
};
