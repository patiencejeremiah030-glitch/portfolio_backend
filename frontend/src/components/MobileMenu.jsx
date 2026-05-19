import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
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
  const { cardBorder, isDark, pageBg } = useAppTheme();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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

      {open && (
        <Box
          position="fixed"
          inset={0}
          zIndex={200}
          onClick={() => setOpen(false)}
        >
          <Box
            position="absolute"
            inset={0}
            bg="blackAlpha.600"
            backdropFilter="blur(4px)"
          />
          <Box
            position="absolute"
            top={0}
            right={0}
            h="100%"
            w={{ base: "min(320px, 88vw)", sm: "340px" }}
            borderLeftWidth="1px"
            borderColor={cardBorder}
            shadow="2xl"
            onClick={(e) => e.stopPropagation()}
            css={{
              animation: "slideIn 0.25s ease-out",
              "@keyframes slideIn": {
                from: { transform: "translateX(100%)" },
                to: { transform: "translateX(0)" },
              },
            }}
          >
            <Flex
              direction="column"
              h="100%"
              p={6}
              gap={6}
              bg={pageBg}
            >
              <Flex justify="space-between" align="center">
                <Text fontWeight="bold" fontSize="lg" color="brand.500">
                  AUDREY.
                </Text>
                <HStack gap={2}>
                  <ColorModeToggle />
                  <IconButton
                    aria-label="Close menu"
                    variant="ghost"
                    size="sm"
                    onClick={() => setOpen(false)}
                  >
                    ✕
                  </IconButton>
                </HStack>
              </Flex>

              <VStack align="stretch" gap={1} flex={1}>
                {navLinks.map(({ to, label }) => {
                  const active = isActive(location.pathname, to);
                  return (
                    <Link
                      key={to}
                      asChild
                      display="block"
                      py={3}
                      px={4}
                      borderRadius="xl"
                      fontWeight={active ? "semibold" : "medium"}
                      color={active ? "brand.500" : isDark ? "gray.200" : "gray.700"}
                      bg={active ? (isDark ? "whiteAlpha.100" : "brand.50") : "transparent"}
                      _hover={{
                        textDecoration: "none",
                        bg: isDark ? "whiteAlpha.100" : "gray.100",
                      }}
                    >
                      <RouterLink to={to}>{label}</RouterLink>
                    </Link>
                  );
                })}
              </VStack>

              <Button
                asChild
                colorPalette="brand"
                size="lg"
                w="full"
                onClick={() => setOpen(false)}
              >
                <RouterLink to="/contact">Get in touch</RouterLink>
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </>
  );
}
