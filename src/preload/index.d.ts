export interface IApi {
  vault: {
    open: () => Promise<string | null>;
    list: (vaultPath: string) => Promise<string[]>;
  };
  page: {
    read: (vaultPath: string, pageName: string) => Promise<string>;
    write: (vaultPath: string, pageName: string, content: string) => Promise<void>;
  };
}

declare global {
  interface Window {
    api: IApi;
  }
}
