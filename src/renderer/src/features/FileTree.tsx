import type { FileTreeNode } from "@renderer/lib/fileTree";
import { FileTreeItem } from "./FileTreeItem";

export type FileTreeProps = {
  nodes: FileTreeNode[];
  activePage: string | null;
  onPageSelect: (path: string) => void;
  depth?: number;
};

export const FileTree = ({ nodes, activePage, onPageSelect, depth = 0 }: FileTreeProps) => {
  return (
    <div>
      {nodes.map((node) => (
        <FileTreeItem
          key={node.path}
          node={node}
          activePage={activePage}
          onPageSelect={onPageSelect}
          depth={depth}
        />
      ))}
    </div>
  );
};
