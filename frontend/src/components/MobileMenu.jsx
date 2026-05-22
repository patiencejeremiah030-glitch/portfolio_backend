import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import ColorModeToggle from "./ColorModeToggle";
import { useAuth } from "../context/AuthContext";
import useAppTheme from "../hooks/useAppTheme";

const navLinks = [
  { to: "/", label: "Home", hint: "Start here" },
  { to: "/about", label: "About", hint: "My story" },
  { to: "/projects", label: "Projects", hint: "Selected work" },
  { to: "/blog", label: "Blog", hint: "Articles" },
  { to: "/contact", label: "Contact", hint: "Say hello" },
  { to: "/chat", label: "AI Assistant", hint: "Ask anything", accent: true },
];

function isActive(pathname, to) {
  if (to === "/") return pathname === "/";
  return pathname.startsWith(to);
}

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { isDark } = useAppTheme();
  const { isAuthenticated, user, logout, loading: authLoading } = useAuth();

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
        bg={isDark ? "blackAlpha.800" : "blackAlpha.600"}
        backdropFilter="blur(6px)"
      />

      <Box
        position="absolute"
        top={0}
        right={0}
        h="100dvh"
        w={{ base: "min(320px, 92vw)", sm: "360px" }}
        display="flex"
        flexDirection="column"
        shadow="2xl"
        onClick={(e) => e.stopPropagation()}
        overflow="hidden"
        css={{
          animation: "mobileMenuIn 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
          "@keyframes mobileMenuIn": {
            from: { transform: "translateX(100%)", opacity: 0.6 },
            to: { transform: "translateX(0)", opacity: 1 },
          },
        }}
      >
        {/* Header */}
        <Flex
          align="center"
          justify="space-between"
          px={5}
          py={5}
          flexShrink={0}
          bgGradient="to-r"
          gradientFrom="#4f46e5"
          gradientVia="#3b82f6"
          gradientTo="#06b6d4"
          color="white"
        >
          <Box>
            <Text fontSize="xs" fontWeight="semibold" opacity={0.9} letterSpacing="0.12em">
              NAVIGATION
            </Text>
            <Text fontFamily="heading" fontSize="xl" fontWeight="800" letterSpacing="-0.03em">
              Browse
            </Text>
          </Box>
          <HStack gap={2}>
            <Box
              css={{
                "& button": {
                  borderColor: "rgba(255,255,255,0.45) !important",
                  color: "white !important",
                },
              }}
            >
              <ColorModeToggle />
            </Box>
            <IconButton
              aria-label="Close menu"
              variant="outline"
              size="sm"
              borderRadius="full"
              borderColor="whiteAlpha.500"
              color="white"
              bg="whiteAlpha.200"
              _hover={{ bg: "whiteAlpha.300" }}
              onClick={() => setOpen(false)}
            >
              ✕
            </IconButton>
          </HStack>
        </Flex>

        {/* Links */}
        <VStack
          as="nav"
          aria-label="Mobile navigation"
          align="stretch"
          gap={1.5}
          flex={1}
          overflowY="auto"
          px={4}
          py={5}
          bg={isDark ? "#0f172a" : "#f8fafc"}
        >
          {navLinks.map(({ to, label, hint, accent }) => {
            const active = isActive(location.pathname, to);
            return (
              <RouterLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                style={{ textDecoration: "none" }}
              >
                <Flex
                  align="center"
                  gap={3}
                  py={3.5}
                  px={4}
                  borderRadius="xl"
                  position="relative"
                  transition="all 0.2s ease"
                  bg={
                    active
                      ? isDark
                        ? "linear-gradient(90deg, rgba(99,102,241,0.35), rgba(59,130,246,0.15))"
                        : "linear-gradient(90deg, #e0e7ff, #eff6ff)"
                      : accent
                        ? isDark
                          ? "rgba(6,182,212,0.12)"
                          : "rgba(224,242,254,0.9)"
                        : "transparent"
                  }
                  borderWidth="1px"
                  borderColor={
                    active
                      ? isDark
                        ? "#6366f1"
                        : "#a5b4fc"
                      : accent
                        ? isDark
                          ? "#0891b2"
                          : "#7dd3fc"
                        : "transparent"
                  }
                  boxShadow={active ? (isDark ? "0 4px 20px rgba(99,102,241,0.2)" : "0 4px 16px rgba(99,102,241,0.12)") : "none"}
                  _hover={{
                    bg: isDark ? "#1e293b" : "#ffffff",
                    borderColor: isDark ? "#475569" : "#cbd5e1",
                    transform: "translateX(4px)",
                  }}
                  css={
                    active
                      ? {
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: "20%",
                            bottom: "20%",
                            width: "4px",
                            borderRadius: "0 4px 4px 0",
                            background: "linear-gradient(180deg, #6366f1, #3b82f6)",
                          },
                        }
                      : undefined
                  }
                >
                  <Flex
                    w={10}
                    h={10}
                    borderRadius="lg"
                    align="center"
                    justify="center"
                    flexShrink={0}
                    fontSize="sm"
                    fontWeight="bold"
                    bg={
                      active || accent
                        ? "linear-gradient(135deg, #6366f1, #3b82f6)"
                        : isDark
                          ? "#1e293b"
                          : "#e2e8f0"
                    }
                    color={active || accent ? "white" : isDark ? "#94a3b8" : "#64748b"}
                  >
                    {label.charAt(0)}
                  </Flex>
                  <Box flex={1} minW={0}>
                    <Text
                      fontSize="md"
                      fontWeight="bold"
                      letterSpacing="-0.02em"
                      color={
                        active
                          ? isDark
                            ? "#e0e7ff"
                            : "#312e81"
                          : isDark
                            ? "#f1f5f9"
                            : "#0f172a"
                      }
                    >
                      {label}
                    </Text>
                    <Text
                      fontSize="xs"
                      color={isDark ? "#94a3b8" : "#64748b"}
                      mt={0.5}
                      truncate
                    >
                      {hint}
                    </Text>
                  </Box>
                  {active && (
                    <Box
                      w={2}
                      h={2}
                      borderRadius="full"
                      bg="#22c55e"
                      flexShrink={0}
                      css={{ boxShadow: "0 0 8px rgba(34,197,94,0.8)" }}
                    />
                  )}
                </Flex>
              </RouterLink>
            );
          })}
        </VStack>

        {!authLoading && (
          <Box px={4} pb={2}>
            <Separator mb={3} borderColor={isDark ? "#334155" : "#e2e8f0"} />
            {isAuthenticated ? (
              <VStack align="stretch" gap={2}>
                <RouterLink
                  to="/account"
                  onClick={() => setOpen(false)}
                  style={{ textDecoration: "none" }}
                >
                  <Text fontSize="md" fontWeight="bold" color={isDark ? "#e0e7ff" : "#312e81"} px={2}>
                    Signed in as {user?.username}
                  </Text>
                </RouterLink>
                <Button
                  variant="outline"
                  colorPalette="brand"
                  w="full"
                  borderRadius="xl"
                  onClick={async () => {
                    await logout();
                    setOpen(false);
                  }}
                >
                  Log out
                </Button>
              </VStack>
            ) : (
              <HStack gap={2}>
                <Button
                  asChild
                  flex={1}
                  variant="outline"
                  colorPalette="brand"
                  borderRadius="xl"
                  onClick={() => setOpen(false)}
                >
                  <RouterLink to="/login">Log in</RouterLink>
                </Button>
                <Button
                  asChild
                  flex={1}
                  colorPalette="brand"
                  borderRadius="xl"
                  onClick={() => setOpen(false)}
                >
                  <RouterLink to="/register">Sign up</RouterLink>
                </Button>
              </HStack>
            )}
          </Box>
        )}

        {/* Footer CTA */}
        <Box
          px={4}
          py={5}
          flexShrink={0}
          bg={isDark ? "#0f172a" : "#f8fafc"}
          borderTopWidth="1px"
          borderColor={isDark ? "#1e293b" : "#e2e8f0"}
        >
          <Separator mb={4} borderColor={isDark ? "#334155" : "#e2e8f0"} />
          <Button
            asChild
            w="full"
            size="lg"
            borderRadius="xl"
            fontWeight="bold"
            h="52px"
            bgGradient="to-r"
            gradientFrom="#4f46e5"
            gradientTo="#2563eb"
            color="white"
            shadow="lg"
            _hover={{
              shadow: "xl",
              transform: "translateY(-2px)",
            }}
            transition="all 0.2s"
            onClick={() => setOpen(false)}
          >
            <RouterLink to="/contact">Get in touch →</RouterLink>
          </Button>
          <Text
            textAlign="center"
            fontSize="xs"
            color={isDark ? "#64748b" : "#94a3b8"}
            mt={3}
          >
            Open to collaborations & new projects
          </Text>
        </Box>
      </Box>
    </Box>
  ) : null;

  return (
    <>
      <IconButton
        aria-label={open ? "Close menu" : "Open menu"}
        variant={open ? "solid" : "outline"}
        colorPalette="brand"
        size="sm"
        borderRadius="lg"
        bg={open ? "brand.600" : undefined}
        color={open ? "white" : undefined}
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
