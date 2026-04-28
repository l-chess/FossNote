import { useUIStore } from "@renderer/store/ui";
import { TbMoon, TbSun } from "react-icons/tb";
import { Button } from "./Button";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useUIStore();

  return (
    <Button
      label={theme === "dark" ? <TbSun /> : <TbMoon />}
      onClick={toggleTheme}
      className="text-xl"
    />
  );
};
