import type { ReactNode } from "react";

export type ButtonProps = {
  label: string | ReactNode;
  onClick?: () => void;
  className?: string;
};

export const Button = ({ label, onClick, className }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer hover:bg-gray-200 rounded-md p-1 ${className}`}
    >
      {label}
    </button>
  );
};
