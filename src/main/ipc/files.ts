import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { dialog, ipcMain } from "electron";

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
    const entries = await readdir(vaultPath, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && e.name.endsWith(".md"))
      .map((e) => e.name.replace(/\.md$/, ""));
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
}
