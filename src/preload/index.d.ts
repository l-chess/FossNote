export interface IApi {
  vault: {
    open: () => Promise<string | null>;
    list: (vaultPath: string) => Promise<string[]>;
  };
  page: {
    read: (vaultPath: string, pageName: string) => Promise<string>;
    write: (vaultPath: string, pageName: string, content: string) => Promise<void>;
    rename: (vaultPath: string, oldName: string, newName: string) => Promise<string>;
    create: (vaultPath: string, pageName: string) => Promise<string>;
    delete: (vaultPath: string, pageName: string) => Promise<void>;
  };
  folder: {
    create: (vaultPath: string, folderName: string) => Promise<string>;
    delete: (vaultPath: string, folderName: string) => Promise<void>;
    rename: (vaultPath: string, oldName: string, newName: string) => Promise<string>;
  };
}

declare global {
  interface Window {
    api: IApi;
  }
}
