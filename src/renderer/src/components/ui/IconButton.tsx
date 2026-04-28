import type { ReactNode } from "react";

export type IconButtonProps = {
  label: ReactNode;
  ariaLabel: string;
  onClick?: () => void;
  className?: string;
};

export const IconButton = ({ label, ariaLabel, onClick, className }: IconButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`flex cursor-pointer rounded-md aspect-square w-10 hover:bg-hover dark:hover:bg-hover-dark justify-center items-center ${className}`}
    >
      {label}
    </button>
  );
};
