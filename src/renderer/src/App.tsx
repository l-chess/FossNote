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

  return (
    <div className="flex h-screen w-screen bg-white text-black dark:bg-gray-900 dark:text-white overflow-hidden">
      <Sidebar
        files={files}
        activePage={activePage}
        onPageSelect={setActivePage}
        onOpenVault={handleOpenVault}
      />
      <main className="flex-1 overflow-y-auto">
        {activePage && vaultPath ? (
          <Editor vaultPath={vaultPath} pageName={activePage} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
            Select a page to start editing
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
