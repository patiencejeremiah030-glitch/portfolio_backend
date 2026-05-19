import { IconButton } from "@chakra-ui/react";
import useAppTheme from "../hooks/useAppTheme";

export default function ColorModeToggle() {
  const { isDark, toggleTheme } = useAppTheme();

  return (
    <IconButton
      aria-label="Toggle color mode"
      variant="outline"
      colorPalette="brand"
      onClick={toggleTheme}
      size="sm"
      borderRadius="full"
      borderColor="inherit"
    >
      {isDark ? "☀️" : "🌙"}
    </IconButton>
  );
}
