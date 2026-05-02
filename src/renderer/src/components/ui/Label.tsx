export type LabelProps = {
  label: string;
};

export const Label = ({ label }: LabelProps) => {
  return (
    <div className="opacity-80 bg-black px-2 py-1 rounded-md border border-secondary">
      <span className="text-white">{label}</span>
    </div>
  );
};
