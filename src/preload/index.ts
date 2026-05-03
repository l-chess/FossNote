import { electronAPI } from "@electron-toolkit/preload";
import { contextBridge, ipcRenderer } from "electron";

const api = {
  vault: {
    open: () => ipcRenderer.invoke("vault:open"),
    list: (vaultPath: string) => ipcRenderer.invoke("vault:list", vaultPath),
  },
  page: {
    read: (vaultPath: string, pageName: string) =>
      ipcRenderer.invoke("page:read", vaultPath, pageName),
    write: (vaultPath: string, pageName: string, content: string) =>
      ipcRenderer.invoke("page:write", vaultPath, pageName, content),
    rename: (vaultPath: string, oldName: string, newName: string) =>
      ipcRenderer.invoke("page:rename", vaultPath, oldName, newName),
    create: (vaultPath: string, pageName: string) =>
      ipcRenderer.invoke("page:create", vaultPath, pageName),
    delete: (vaultPath: string, pageName: string) =>
      ipcRenderer.invoke("page:delete", vaultPath, pageName),
  },
  folder: {
    create: (vaultPath: string, folderName: string) =>
      ipcRenderer.invoke("folder:create", vaultPath, folderName),
    delete: (vaultPath: string, folderName: string) =>
      ipcRenderer.invoke("folder:delete", vaultPath, folderName),
    rename: (vaultPath: string, oldName: string, newName: string) =>
      ipcRenderer.invoke("folder:rename", vaultPath, oldName, newName),
  },
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-expect-error (define in dts)
  window.electron = electronAPI;
  // @ts-expect-error (define in dts)
  window.api = api;
}
