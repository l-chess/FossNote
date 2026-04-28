import { Button } from "@renderer/components/ui/Button";
import { IconButton } from "@renderer/components/ui/IconButton";
import { ThemeToggle } from "@renderer/components/ui/ThemeToggle";
import { useState } from "react";
import { FaFolderMinus } from "react-icons/fa6";
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarLeftExpand } from "react-icons/tb";

export type SidebarProps = {
  files: string[];
  activePage: string | null;
  onPageSelect: (page: string) => void;
  onOpenVault: () => void;
};

export const Sidebar = ({ files, activePage, onPageSelect, onOpenVault }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <div className="flex h-screen shrink-0">
      <div className="border-r border-gray-500 left-0 p-1 flex flex-col items-center text-gray-500">
        <IconButton
          label={collapsed ? <TbLayoutSidebarLeftExpand /> : <TbLayoutSidebarLeftCollapseFilled />}
          ariaLabel={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          onClick={() => setCollapsed(!collapsed)}
          className="text-2xl"
        />
        <ThemeToggle />
        <IconButton
          label={<FaFolderMinus />}
          onClick={onOpenVault}
          ariaLabel="Open Vault"
          className="absolute bottom-1 text-xl"
        />
      </div>

      <div
        className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out border-r border-gray-500 ${collapsed ? "w-0" : "w-52"}`}
      >
        <div className="flex-col flex px-2 gap-1 min-w-52">
          <span className="font-semibold uppercase text-sm text-gray-500 mt-3">Pages</span>
          {files.map((file) => (
            <Button
              key={file}
              label={file}
              onClick={() => onPageSelect(file)}
              className={`text-left ${activePage === file && "bg-gray-200 dark:bg-gray-700"}`}
              hover={activePage === file ? "hover:bg-gray-300 dark:hover:bg-gray-600" : ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
