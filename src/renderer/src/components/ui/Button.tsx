import type { CSSProperties, ReactNode } from "react";

export type ButtonProps = {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  className?: string;
  style?: CSSProperties;
};

export const Button = ({ label, icon, onClick, onContextMenu, className, style }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      onContextMenu={onContextMenu}
      style={style}
      className={`cursor-pointer rounded-md px-2 py-1 flex items-center text-left gap-1 w-full min-w-0 overflow-hidden ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="min-w-0 truncate">{label}</span>
    </button>
  );
};
