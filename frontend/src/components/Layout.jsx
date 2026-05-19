import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import PageTransition from "./motion/PageTransition";
import useAppTheme from "../hooks/useAppTheme";

export default function Layout() {
  const { pageBg, isDark } = useAppTheme();

  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      bg={pageBg}
      color={isDark ? "gray.100" : "gray.900"}
      transition="background 0.3s ease, color 0.3s ease"
    >
      <Box
        position="fixed"
        inset={0}
        pointerEvents="none"
        zIndex={0}
        opacity={isDark ? 0.3 : 0.45}
        bgImage={
          isDark
            ? "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.06) 1px, transparent 0)"
            : "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.14) 1px, transparent 0)"
        }
        bgSize="28px 28px"
      />
      <Box
        position="fixed"
        inset={0}
        pointerEvents="none"
        zIndex={0}
        bg={
          isDark
            ? "radial-gradient(ellipse 80% 50% at 20% 0%, rgba(99,102,241,0.08), transparent), radial-gradient(ellipse 60% 40% at 90% 80%, rgba(148,163,184,0.06), transparent)"
            : "radial-gradient(ellipse 80% 50% at 10% 0%, rgba(99,102,241,0.05), transparent), radial-gradient(ellipse 50% 40% at 95% 70%, rgba(148,163,184,0.08), transparent)"
        }
      />
      <Box position="relative" zIndex={1} display="flex" flexDirection="column" flex="1">
        <Navbar />
        <Box as="main" flex="1" py={{ base: 6, md: 10 }}>
          <PageTransition />
        </Box>
        <Footer />
        <ScrollToTop />
      </Box>
    </Box>
  );
}
