import { useState } from "react";
import { Editor } from "./features/Editor";
import { Sidebar } from "./features/Sidebar";

function App(): React.JSX.Element {
  const [vaultPath, setVaultPath] = useState<string | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [activePage, setActivePage] = useState<string | null>(null);

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
  };

  return (
    <div className="flex h-screen w-screen bg-bg text-primary dark:bg-bg-dark dark:text-primary-dark overflow-hidden">
      <Sidebar
        files={files}
        activePage={activePage}
        onPageSelect={setActivePage}
        onOpenVault={handleOpenVault}
      />
      <main className="flex-1 overflow-y-auto">
        {activePage && vaultPath ? (
          <Editor vaultPath={vaultPath} pageName={activePage} onRename={handleRename} />
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
