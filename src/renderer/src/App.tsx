import { useEffect, useState } from "react";
import { Editor } from "./features/Editor";
import { Sidebar } from "./features/Sidebar";
import { useVaultStore } from "./store/vault";

function App(): React.JSX.Element {
  const { vaultPath, activePage, files, setVaultPath, setFiles, setActivePage, renameFile } =
    useVaultStore();
  const [focusTitle, setFocusTitle] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleOpenVault = async () => {
    const path = await window.api.vault.open();
    if (!path) return;
    setVaultPath(path);
    const pages = await window.api.vault.list(path);
    setFiles(pages);
    setActivePage(null);
  };

  const handleCreatePage = async () => {
    if (!vaultPath) return;
    await window.api.page.create(vaultPath, "Untitled");
    const pages = await window.api.vault.list(vaultPath);
    setFiles(pages);
    setActivePage("Untitled");
    setFocusTitle(true);
  };

  const handleDeletePage = async (pageName: string) => {
    if (!vaultPath) return;
    await window.api.page.delete(vaultPath, pageName);
    const pages = await window.api.vault.list(vaultPath);
    setFiles(pages);
    if (activePage === pageName) setActivePage(null);
  };

  const handleCreateFolder = async () => {
    if (!vaultPath) return;
    await window.api.folder.create(vaultPath, "Untitled");
    const pages = await window.api.vault.list(vaultPath);
    setFiles(pages);
    setActivePage("Untitled/Untitled");
    setFocusTitle(true);
  };

  const handleDeleteFolder = async (folderName: string) => {
    if (!vaultPath) return;
    await window.api.folder.delete(vaultPath, folderName);
    const pages = await window.api.vault.list(vaultPath);
    setFiles(pages);
    if (activePage?.startsWith(`${folderName}/`)) setActivePage(null);
  };

  const handleRename = (oldName: string, newName: string) => {
    renameFile(oldName, newName);
    setFocusTitle(false);
  };

  useEffect(() => {
    if (!vaultPath) return;
    window.api.vault.list(vaultPath).then(setFiles);
  }, [setFiles, vaultPath]);

  return (
    <div className="flex h-screen w-screen bg-bg text-primary dark:bg-bg-dark dark:text-primary-dark overflow-hidden">
      <Sidebar
        files={files}
        activePage={activePage}
        vaultName={vaultPath?.split("/").pop()}
        collapsed={sidebarCollapsed}
        onCollapse={setSidebarCollapsed}
        onPageSelect={setActivePage}
        onOpenVault={handleOpenVault}
        onCreatePage={handleCreatePage}
        onDeletePage={handleDeletePage}
        onCreateFolder={handleCreateFolder}
        onDeleteFolder={handleDeleteFolder}
      />
      <main className="flex-1 min-w-0 overflow-y-auto transition-all duration-300 ease-in-out">
        {activePage && vaultPath ? (
          <>
            <Editor
              vaultPath={vaultPath}
              pageName={activePage}
              onRename={handleRename}
              focusTitle={focusTitle}
            />
            <div className="h-1/2" />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-secondary text-sm">
            Select a page to start editing
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
