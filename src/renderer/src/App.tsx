import { useState } from "react";
import { Editor } from "./components/Editor";
import { Sidebar } from "./components/Sidebar";

function App(): React.JSX.Element {
  const [activePage, setActivePage] = useState<string | null>(null);

  return (
    <div className="flex h-screen w-screen bg-white text-gray-900 overflow-hidden">
      <Sidebar
        files={["Page 1", "Page 2", "Page 3"]}
        activePage={activePage}
        onPageSelect={setActivePage}
      />
      <main className="flex-1 overflow-y-auto">
        {activePage ? (
          <Editor />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Select a page to start editing
            <button type="button" onClick={window.api.vault.open}>
              Pick Folder
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
