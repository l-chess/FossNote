import { CollapsableSidebar } from "@renderer/components/ui/CollapsableSidebar";
import { IconButton } from "@renderer/components/ui/IconButton";
import { buildTree } from "@renderer/lib/fileTree";
import { useMemo } from "react";
import { AiOutlineFileAdd, AiOutlineFolderAdd } from "react-icons/ai";
import { FaFolderMinus } from "react-icons/fa6";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { FileTree } from "./FileTree";
import { ThemeToggle } from "./ThemeToggle";

export type SidebarProps = {
  files: string[];
  activePage: string | null;
  vaultName?: string;
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  onPageSelect: (page: string) => void;
  onOpenVault: () => void;
  onCreatePage: () => void;
  onCreateFolder: () => void;
};

export const Sidebar = ({
  files,
  activePage,
  vaultName,
  collapsed,
  onCollapse,
  onPageSelect,
  onOpenVault,
  onCreatePage,
  onCreateFolder,
}: SidebarProps) => {
  const tree = useMemo(() => buildTree(files), [files]);

  return (
    <div className="flex h-screen shrink-0">
      {/* icon strip */}
      <div
        className={`border-r border-secondary left-0 p-1 flex flex-col items-center text-secondary ${collapsed && "border-none"}`}
      >
        <IconButton
          label={collapsed ? <TbLayoutSidebarLeftExpandFilled /> : <TbLayoutSidebarLeftCollapse />}
          ariaLabel={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          onClick={() => onCollapse(!collapsed)}
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
      <CollapsableSidebar collapsed={collapsed} borderRight={true}>
        <div className="flex justify-between sticky items-center top-0 p-1 bg-bg dark:bg-bg-dark">
          {vaultName && <span className="text-center sticky truncate">{vaultName}</span>}
          <div className="flex">
            <IconButton
              label={<AiOutlineFileAdd />}
              ariaLabel="New Page"
              className="text-secondary text-xl"
              onClick={onCreatePage}
            />
            <IconButton
              label={<AiOutlineFolderAdd />}
              ariaLabel="New Folder"
              className="text-secondary text-2xl"
              onClick={onCreateFolder}
            />
          </div>
        </div>
        <FileTree nodes={tree} activePage={activePage} onPageSelect={onPageSelect} />
        <div className="h-60" />
      </CollapsableSidebar>
    </div>
  );
};
