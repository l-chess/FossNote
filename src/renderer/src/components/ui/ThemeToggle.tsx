import { useUIStore } from "@renderer/store/ui";
import { TbMoon, TbSun } from "react-icons/tb";
import { IconButton } from "./IconButton";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useUIStore();

  return (
    <IconButton
      label={theme === "dark" ? <TbSun /> : <TbMoon />}
      onClick={toggleTheme}
      ariaLabel={theme === "dark" ? "Set Light Mode" : "Set Dark Mode"}
      className="text-2xl"
    />
  );
};
