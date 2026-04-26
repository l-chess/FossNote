import { useState } from "react";

export type SidebarProps = {
  files: string[];
  activePage: string | null;
  onPageSelect: (page: string) => void;
};

export const Sidebar = ({ files, activePage, onPageSelect }: SidebarProps) => {
  const [collapseSidebar, setCollapseSidebar] = useState<boolean>(false);
  const handleCollapse = () => {
    setCollapseSidebar(!collapseSidebar);
  };

  if (collapseSidebar) {
    return (
      <div>
        <button
          onClick={handleCollapse}
          type="button"
          className="text-xs text-gray-400 hover:text-gray-600 text-left px-2"
        >
          show Sidebar
        </button>
      </div>
    );
  } else {
    return (
      <div className="relative border-r border-gray-200 p-3 h-screen w-48 flex flex-col shrink-0">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
          Pages
        </span>
        <div className="flex-1 flex flex-col gap-0.5">
          {files.map((file) => (
            <button
              type="button"
              key={file}
              onClick={() => onPageSelect(file)}
              className={`text-left text-sm py-1 px-2 rounded-md w-full transition-colors ${
                activePage === file
                  ? "bg-gray-200 text-gray-900 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {file}
            </button>
          ))}
        </div>
        <button
          onClick={handleCollapse}
          type="button"
          className="text-xs text-gray-400 hover:text-gray-600 text-left px-2"
        >
          ← Collapse
        </button>
      </div>
    );
  }
};
