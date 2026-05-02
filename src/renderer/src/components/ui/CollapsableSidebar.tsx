import type { ReactNode } from "react";

export type CollapsableSidebarProps = {
  collapsed: boolean;
  children: ReactNode;
};

export const CollapsableSidebar = ({ collapsed, children }: CollapsableSidebarProps) => {
  return (
    <div
      className={`flex flex-col transition-all duration-300 ease-in-out border-r border-secondary overflow-y-scroll overflow-x-hidden ${collapsed ? "w-0" : "w-64"}`}
    >
      <div className="flex flex-col px-2 gap-1 w-full">{children}</div>
    </div>
  );
};
