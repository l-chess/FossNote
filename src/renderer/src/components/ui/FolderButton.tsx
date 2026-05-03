import { type ReactNode, useState } from "react";
import { TbChevronDown, TbChevronRight } from "react-icons/tb";
import { Button } from "./Button";

export type FolderButtonProps = {
  name: string;
  depth: number;
  children: ReactNode;
  defaultOpen?: boolean;
  onContextMenu?: (e: React.MouseEvent) => void;
};

export const FolderButton = ({
  name,
  depth,
  children,
  defaultOpen = false,
  onContextMenu,
}: FolderButtonProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="w-full my-1">
      <Button
        label={name}
        icon={open ? <TbChevronDown /> : <TbChevronRight />}
        onClick={() => setOpen(!open)}
        onContextMenu={onContextMenu}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        className="hover:bg-hover dark:hover:bg-hover-dark"
      />
      <div
        className={`overflow-hidden transition-all duration-200 ${open ? "max-h-screen" : "max-h-0"}`}
      >
        {children}
      </div>
    </div>
  );
};
