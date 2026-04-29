import { create } from "zustand";
import { persist } from "zustand/middleware";

interface VaultStore {
  vaultPath: string | null;
  activePage: string | null;
  files: string[];
  setVaultPath: (path: string) => void;
  setActivePage: (page: string | null) => void;
  setFiles: (files: string[]) => void;
  renameFile: (oldName: string, newName: string) => void;
}

export const useVaultStore = create<VaultStore>()(
  persist(
    (set) => ({
      vaultPath: null,
      activePage: null,
      files: [],
      setVaultPath: (path) => set({ vaultPath: path }),
      setActivePage: (page) => set({ activePage: page }),
      setFiles: (files) => set({ files }),
      renameFile: (oldName, newName) =>
        set((state) => ({
          files: state.files.map((f) => (f === oldName ? newName : f)),
          activePage: state.activePage === oldName ? newName : state.activePage,
        })),
    }),
    { name: "fossnote-vault" },
  ),
);
