import type { ChangeEvent, CSSProperties, ReactNode, RefObject } from "react";

export type InputProps = {
  ref: RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export type ButtonProps = {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  className?: string;
  style?: CSSProperties;
  renaming?: boolean;
  inputProps?: InputProps;
};

export const Button = ({
  label,
  icon,
  onClick,
  onContextMenu,
  className,
  style,
  renaming = false,
  inputProps,
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      onContextMenu={onContextMenu}
      style={style}
      className={`cursor-pointer rounded-md px-2 py-1 flex items-center text-left gap-1 w-full min-w-0 overflow-hidden ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {renaming ? (
        <input
          ref={inputProps?.ref}
          value={inputProps?.value}
          onChange={inputProps?.onChange}
          onBlur={inputProps?.onBlur}
          onKeyDownCapture={inputProps?.onKeyDown}
          className="w-full px-1 border border-secondary rounded-md outline-none"
        />
      ) : (
        <span className="min-w-0 truncate">{label}</span>
      )}
    </button>
  );
};
