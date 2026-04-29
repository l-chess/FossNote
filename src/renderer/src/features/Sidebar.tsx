import { Button } from "@renderer/components/ui/Button";
import { IconButton } from "@renderer/components/ui/IconButton";
import { ThemeToggle } from "@renderer/components/ui/ThemeToggle";
import { buildTree } from "@renderer/lib/fileTree";
import { useMemo, useState } from "react";
import { FaFolderMinus, FaPlus } from "react-icons/fa6";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { FileTree } from "./FileTree";

export type SidebarProps = {
  files: string[];
  activePage: string | null;
  vaultName?: string;
  onPageSelect: (page: string) => void;
  onOpenVault: () => void;
  onCreatePage: () => void;
};

export const Sidebar = ({
  files,
  activePage,
  vaultName,
  onPageSelect,
  onOpenVault,
  onCreatePage,
}: SidebarProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const tree = useMemo(() => buildTree(files), [files]);

  return (
    <div className="flex h-screen shrink-0 min-w-3xs w-1/5">
      {/* icon strip */}
      <div
        className={`border-r border-secondary left-0 p-1 flex flex-col items-center text-secondary ${collapsed && "border-none"}`}
      >
        <IconButton
          label={collapsed ? <TbLayoutSidebarLeftExpandFilled /> : <TbLayoutSidebarLeftCollapse />}
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
      <div
        className={`flex flex-col transition-all duration-300 ease-in-out border-r border-secondary overflow-y-scroll ${collapsed ? "w-0" : "w-full"}`}
      >
        <div className="flex flex-col px-2 gap-1 w-full">
          {vaultName && (
            <span className="py-2 text-center sticky top-0 bg-bg dark:bg-bg-dark">{vaultName}</span>
          )}
          <span className="font-semibold uppercase text-sm text-secondary">Pages</span>
          <Button
            label="New Page"
            icon={<FaPlus />}
            className="hover:bg-hover dark:hover:bg-hover-dark text-secondary gap-2"
            onClick={onCreatePage}
          />
          <FileTree nodes={tree} activePage={activePage} onPageSelect={onPageSelect} />
        </div>
      </div>
    </div>
  );
};
