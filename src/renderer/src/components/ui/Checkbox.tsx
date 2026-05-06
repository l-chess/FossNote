import { BiCheckbox, BiSolidCheckboxChecked } from "react-icons/bi";

export type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const Checkbox = ({ checked, onChange }: CheckboxProps) => {
  return (
    <button
      type="button"
      contentEditable={false}
      onClick={() => onChange(!checked)}
      className="text-2xl mt-0.5"
    >
      {checked ? <BiSolidCheckboxChecked /> : <BiCheckbox />}
    </button>
  );
};
