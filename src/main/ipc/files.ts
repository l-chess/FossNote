import { mkdir, readdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { dialog, ipcMain } from "electron";

async function listMarkdownFiles(dir: string, rootDir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const results: string[] = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await listMarkdownFiles(fullPath, rootDir);
      results.push(...nested);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      results.push(relative(rootDir, fullPath).replace(/\.md$/, ""));
    }
  }
  return results;
}

export function registerFileHandlers(): void {
  // Open a folder picker and return the chosen path
  ipcMain.handle("vault:open", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });
    if (result.canceled) return null;
    return result.filePaths[0];
  });

  // List all .md files in a vault folder
  ipcMain.handle("vault:list", async (_, vaultPath: string) => {
    return await listMarkdownFiles(vaultPath, vaultPath);
  });

  // Read a single page's content
  ipcMain.handle("page:read", async (_, vaultPath: string, pageName: string) => {
    const filePath = join(vaultPath, `${pageName}.md`);
    return await readFile(filePath, "utf-8");
  });

  // Write a page's content back to disk
  ipcMain.handle("page:write", async (_, vaultPath: string, pageName: string, content: string) => {
    const filePath = join(vaultPath, `${pageName}.md`);
    await writeFile(filePath, content, "utf-8");
  });

  ipcMain.handle("page:rename", async (_, vaultPath: string, oldName: string, newName: string) => {
    const oldPath = join(vaultPath, `${oldName}.md`);
    const newPath = join(vaultPath, `${newName}.md`);
    await rename(oldPath, newPath);
    return newName;
  });

  ipcMain.handle("page:create", async (_, vaultPath: string, pageName: string) => {
    const filePath = join(vaultPath, `${pageName}.md`);
    await writeFile(filePath, "", "utf-8");
    return pageName;
  });

  ipcMain.handle("page:delete", async (_, vaultPath: string, pageName: string) => {
    const filePath = join(vaultPath, `${pageName}.md`);
    await rm(filePath);
  });

  ipcMain.handle("folder:create", async (_, vaultPath: string, folderName: string) => {
    const folderPath = join(vaultPath, folderName);
    await mkdir(folderPath, { recursive: true });
    return folderName;
  });

  ipcMain.handle("folder:delete", async (_, vaultPath: string, folderName: string) => {
    const folderPath = join(vaultPath, folderName);
    await rm(folderPath, { recursive: true });
  });
}
