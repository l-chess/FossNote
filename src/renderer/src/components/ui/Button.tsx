export type ButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
  hover?: string;
};

export const Button = ({ label, onClick, className, hover }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-md p-1 ${className} ${hover ? hover : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
    >
      {label}
    </button>
  );
};
