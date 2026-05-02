import type { ReactNode } from "react";

export type CollapsableSidebarProps = {
  collapsed: boolean;
  children: ReactNode;
  borderRight: boolean;
};

export const CollapsableSidebar = ({
  collapsed,
  children,
  borderRight,
}: CollapsableSidebarProps) => {
  return (
    <div
      className={`flex flex-col transition-all duration-300 ease-in-out border-secondary overflow-y-scroll overflow-x-hidden ${borderRight ? "border-r" : "border-l"} ${collapsed ? "w-0" : "w-64"}`}
    >
      <div className="flex flex-col px-2 gap-1 w-full">{children}</div>
    </div>
  );
};
