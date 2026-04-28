import { useState } from "react";
import { Editor } from "./components/Editor";
import { Sidebar } from "./components/Sidebar";

function App(): React.JSX.Element {
  const [activePage, setActivePage] = useState<string | null>(null);

  return (
    <div className="flex h-screen w-screen bg-white text-black dark:bg-gray-900 dark:text-white overflow-hidden">
      <Sidebar
        files={["Page 1", "Page 2", "Page 3"]}
        activePage={activePage}
        onPageSelect={setActivePage}
      />
      <main className="flex-1 overflow-y-auto">
        {activePage ? (
          <Editor />
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
