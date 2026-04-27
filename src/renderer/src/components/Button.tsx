import type { ReactNode } from "react";

export type ButtonProps = {
  label: string | ReactNode;
  onClick?: () => void;
};

export const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  );
};
