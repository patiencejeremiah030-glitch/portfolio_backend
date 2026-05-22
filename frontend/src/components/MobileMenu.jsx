import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import ColorModeToggle from "./ColorModeToggle";
import useAppTheme from "../hooks/useAppTheme";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
  { to: "/chat", label: "AI" },
];

function isActive(pathname, to) {
  if (to === "/") return pathname === "/";
  return pathname.startsWith(to);
}

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { isDark } = useAppTheme();

  const panelBg = isDark ? "#0f172a" : "#ffffff";
  const linkColor = isDark ? "#f8fafc" : "#0f172a";
  const linkActiveColor = isDark ? "#c7d2fe" : "#4338ca";

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const menuOverlay = open ? (
    <Box
      position="fixed"
      inset={0}
      zIndex={9999}
      onClick={() => setOpen(false)}
    >
      <Box
        position="absolute"
        inset={0}
        bg="blackAlpha.700"
      />
      <Box
        position="absolute"
        top={0}
        right={0}
        h="100dvh"
        w={{ base: "min(300px, 90vw)", sm: "320px" }}
        bg={panelBg}
        borderLeftWidth="2px"
        borderColor={isDark ? "#334155" : "#bfdbfe"}
        shadow="2xl"
        onClick={(e) => e.stopPropagation()}
        display="flex"
        flexDirection="column"
        css={{
          animation: "mobileMenuIn 0.22s ease-out",
          "@keyframes mobileMenuIn": {
            from: { transform: "translateX(100%)" },
            to: { transform: "translateX(0)" },
          },
        }}
      >
        <Flex
          direction="column"
          h="100%"
          p={5}
          gap={4}
          bg={panelBg}
        >
          <Flex justify="flex-end" align="center" gap={2} flexShrink={0}>
            <ColorModeToggle />
            <IconButton
              aria-label="Close menu"
              variant="outline"
              size="sm"
              colorPalette="brand"
              onClick={() => setOpen(false)}
            >
              ✕
            </IconButton>
          </Flex>

          <Text
            fontSize="xs"
            fontWeight="bold"
            letterSpacing="0.14em"
            textTransform="uppercase"
            color={isDark ? "#94a3b8" : "#64748b"}
            px={2}
          >
            Menu
          </Text>

          <VStack
            as="nav"
            aria-label="Mobile navigation"
            align="stretch"
            gap={2}
            flex={1}
            overflowY="auto"
            px={1}
          >
            {navLinks.map(({ to, label }) => {
              const active = isActive(location.pathname, to);
              return (
                <RouterLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    py={3.5}
                    px={4}
                    borderRadius="lg"
                    bg={
                      active
                        ? isDark
                          ? "#312e81"
                          : "#e0e7ff"
                        : "transparent"
                    }
                    borderWidth={active ? "2px" : "0"}
                    borderColor={isDark ? "#6366f1" : "#6366f1"}
                    _hover={{
                      bg: isDark ? "#1e293b" : "#eff6ff",
                    }}
                  >
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      letterSpacing="-0.01em"
                      color={active ? linkActiveColor : linkColor}
                    >
                      {label}
                    </Text>
                  </Box>
                </RouterLink>
              );
            })}
          </VStack>

          <Button
            asChild
            colorPalette="brand"
            size="lg"
            w="full"
            fontWeight="bold"
            flexShrink={0}
            onClick={() => setOpen(false)}
          >
            <RouterLink to="/contact">Get in touch</RouterLink>
          </Button>
        </Flex>
      </Box>
    </Box>
  ) : null;

  return (
    <>
      <IconButton
        aria-label={open ? "Close menu" : "Open menu"}
        variant="outline"
        colorPalette="brand"
        size="sm"
        borderRadius="lg"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "✕" : "☰"}
      </IconButton>

      {typeof document !== "undefined" && menuOverlay
        ? createPortal(menuOverlay, document.body)
        : null}
    </>
  );
}
