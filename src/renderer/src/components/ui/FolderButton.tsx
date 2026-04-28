import { type ReactNode, useState } from "react";
import { TbChevronDown, TbChevronRight } from "react-icons/tb";
import { Button } from "./Button";

export type FolderButtonProps = {
  name: string;
  depth: number;
  children: ReactNode;
  defaultOpen?: boolean;
};

export const FolderButton = ({ name, depth, children, defaultOpen = false }: FolderButtonProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="w-full">
      <Button
        label={name}
        icon={open ? <TbChevronDown /> : <TbChevronRight />}
        onClick={() => setOpen(!open)}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        className="hover:bg-gray-200 dark:hover:bg-gray-700"
      />
      <div
        className={`overflow-hidden transition-all duration-200 ${open ? "max-h-screen" : "max-h-0"}`}
      >
        {children}
      </div>
    </div>
  );
};
