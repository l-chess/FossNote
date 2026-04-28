import { IconButton } from "@renderer/components/ui/IconButton";
import { ThemeToggle } from "@renderer/components/ui/ThemeToggle";
import { buildTree } from "@renderer/lib/fileTree";
import { useMemo, useState } from "react";
import { FaFolderMinus } from "react-icons/fa6";
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { FileTree } from "./FileTree";

export type SidebarProps = {
  files: string[];
  activePage: string | null;
  onPageSelect: (page: string) => void;
  onOpenVault: () => void;
};

export const Sidebar = ({ files, activePage, onPageSelect, onOpenVault }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const tree = useMemo(() => buildTree(files), [files]);

  return (
    <div className="flex h-screen shrink-0 max-w-1/5">
      {/* icon strip */}
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

      {/* sliding panel */}
      {/* sliding panel */}
      <div
        className={`flex flex-col transition-all duration-300 ease-in-out border-r border-gray-500 overflow-y-scroll ${collapsed ? "w-0" : "w-full"}`}
      >
        <div className="flex flex-col px-2 gap-1 w-full overflow-hidden">
          <span className="font-semibold uppercase text-sm text-gray-500 mt-3">Pages</span>
          <FileTree nodes={tree} activePage={activePage} onPageSelect={onPageSelect} />
        </div>
      </div>
    </div>
  );
};
