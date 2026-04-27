import { useState } from "react";
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { Button } from "./Button";

export type SidebarProps = {
  files: string[];
  activePage: string | null;
  onPageSelect: (page: string) => void;
};

export const Sidebar = ({ files, activePage, onPageSelect }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex">
      <div className="border-r border-gray-300 h-screen left-0 p-1">
        <Button
          label={collapsed ? <TbLayoutSidebarLeftExpand /> : <TbLayoutSidebarLeftCollapseFilled />}
          className="text-xl text-gray-500"
          onClick={handleCollapse}
        />
      </div>
      {!collapsed && (
        <div className="flex-col flex px-2 border-r border-gray-300 w-48 gap-1">
          <span className="font-semibold uppercase text-sm text-gray-500">Pages</span>
          {files.map((file) => (
            <Button
              key={file}
              label={file}
              onClick={() => onPageSelect(file)}
              className={`text-left ${activePage === file && "bg-gray-200 hover:bg-gray-300"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
