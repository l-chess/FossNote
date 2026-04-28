export type FileTreeNode = {
  name: string;
  path: string;
  children: FileTreeNode[];
  isFile: boolean;
};

export function buildTree(paths: string[]): FileTreeNode[] {
  const root: FileTreeNode[] = [];

  for (const path of paths) {
    const parts = path.split("/");
    let currentLevel = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;
      const existingNode = currentLevel.find((n) => n.name === part);

      if (existingNode) {
        currentLevel = existingNode.children;
      } else {
        const newNode: FileTreeNode = {
          name: part,
          path: parts.slice(0, i + 1).join("/"),
          children: [],
          isFile,
        };
        currentLevel.push(newNode);
        currentLevel = newNode.children;
      }
    }
  }
  return root;
}
