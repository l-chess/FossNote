import type { ReactNode } from "react";

export type OptionsProps = {
  children: ReactNode;
};

export const Options = ({ children }: OptionsProps) => {
  return (
    <div className="bg-bg dark:bg-bg-dark text-primary dark:text-primary-dark rounded-md border border-secondary p-1">
      {children}
    </div>
  );
};
