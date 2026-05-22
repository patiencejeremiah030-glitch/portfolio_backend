import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import useAppTheme from "../hooks/useAppTheme";

/** Minimal wrapper for login / register (no portfolio navbar). */
export default function AuthShell() {
  const { pageBg, isDark } = useAppTheme();

  return (
    <Box minH="100vh" bg={pageBg} color={isDark ? "gray.100" : "gray.900"} py={8}>
      <Outlet />
    </Box>
  );
}
