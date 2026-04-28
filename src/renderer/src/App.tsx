import { useState } from "react";
import { Editor } from "./features/Editor";
import { Sidebar } from "./features/Sidebar";

function App(): React.JSX.Element {
  const [vaultPath, setVaultPath] = useState<string | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [activePage, setActivePage] = useState<string | null>(null);
  const [focusTitle, setFocusTitle] = useState(false);

  const handleOpenVault = async () => {
    const path = await window.api.vault.open();
    if (!path) return;
    setVaultPath(path);
    const pages = await window.api.vault.list(path);
    setFiles(pages);
    setActivePage(null);
  };

  const handleRename = (oldName: string, newName: string) => {
    setFiles((prev) => prev.map((f) => (f === oldName ? newName : f)));
    setActivePage(newName);
    setFocusTitle(false);
  };

  const handleCreatePage = async () => {
    if (!vaultPath) return;
    await window.api.page.create(vaultPath, "Untitled");
    const pages = await window.api.vault.list(vaultPath);
    setFiles(pages);
    setActivePage("Untitled");
    setFocusTitle(true);
  };

  return (
    <div className="flex h-screen w-screen bg-bg text-primary dark:bg-bg-dark dark:text-primary-dark overflow-hidden">
      <Sidebar
        files={files}
        activePage={activePage}
        onPageSelect={setActivePage}
        onOpenVault={handleOpenVault}
        onCreatePage={handleCreatePage}
      />
      <main className="flex-1 overflow-y-auto">
        {activePage && vaultPath ? (
          <Editor
            vaultPath={vaultPath}
            pageName={activePage}
            onRename={handleRename}
            focusTitle={focusTitle}
          />
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
