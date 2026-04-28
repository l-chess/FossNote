import { useState } from "react";
import { FaFolderMinus } from "react-icons/fa6";
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { Button } from "./Button";

export type SidebarProps = {
  files: string[];
  activePage: string | null;
  onPageSelect: (page: string) => void;
};

export const Sidebar = ({ files, activePage, onPageSelect }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <div className="flex h-screen shrink-0">
      <div className="border-r border-gray-300 left-0 p-1 flex flex-col items-center text-gray-500">
        <Button
          label={collapsed ? <TbLayoutSidebarLeftExpand /> : <TbLayoutSidebarLeftCollapseFilled />}
          className="text-2xl"
          onClick={() => setCollapsed(!collapsed)}
        />
        <Button
          label={<FaFolderMinus />}
          onClick={window.api.vault.open}
          className="bottom-1 absolute p-2"
        />
      </div>

      <div
        className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out border-r border-gray-300 ${collapsed ? "w-0" : "w-52"}`}
      >
        <div className="flex-col flex px-2 gap-1 min-w-52">
          <span className="font-semibold uppercase text-sm text-gray-500 mt-3">Pages</span>
          {files.map((file) => (
            <Button
              key={file}
              label={file}
              onClick={() => onPageSelect(file)}
              className={`text-left ${activePage === file && "bg-gray-200 hover:bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
