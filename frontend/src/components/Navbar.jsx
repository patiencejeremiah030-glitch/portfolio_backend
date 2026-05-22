import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
} from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { Link as RouterLink, useLocation } from "react-router-dom";
import ColorModeToggle from "./ColorModeToggle";
import MobileMenu from "./MobileMenu";
import useAppTheme from "../hooks/useAppTheme";

const MotionBox = motion.create(Box);

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

function isActive(pathname, to) {
  if (to === "/") return pathname === "/";
  return pathname.startsWith(to);
}

function NavLink({ to, label, pathname, isDark, children }) {
  const active = isActive(pathname, to);
  return (
    <Link
      asChild
      fontSize="sm"
      fontWeight={active ? "semibold" : "medium"}
      color={active ? "brand.500" : isDark ? "gray.300" : "gray.600"}
      px={3}
      py={1.5}
      borderRadius="full"
      bg={active ? (isDark ? "whiteAlpha.100" : "brand.50") : "transparent"}
      _hover={{
        color: "brand.500",
        textDecoration: "none",
        bg: isDark ? "whiteAlpha.100" : "gray.100",
      }}
    >
      <RouterLink to={to}>{children ?? label}</RouterLink>
    </Link>
  );
}

export default function Navbar() {
  const location = useLocation();
  const { navBg, cardBorder, isDark } = useAppTheme();
  const reduceMotion = useReducedMotion();

  const NavWrap = reduceMotion ? Box : MotionBox;
  const navMotion = reduceMotion
    ? {}
    : {
        initial: { y: -20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <NavWrap
      as="nav"
      position="sticky"
      top={0}
      zIndex={100}
      bg={navBg}
      backdropFilter="blur(16px)"
      borderBottomWidth="1px"
      borderColor={cardBorder}
      {...navMotion}
    >
      <Container maxW="container.xl" py={4} px={{ base: 4, md: 8 }}>
        <Flex justify="space-between" align="center" gap={4}>
          <Heading
            size="md"
            letterSpacing="-0.03em"
            flexShrink={1}
            minW={0}
            css={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          >
            <Link
              asChild
              color="brand.500"
              _hover={{ color: "brand.400", textDecoration: "none" }}
            >
              <RouterLink to="/">
                AUDREY<span style={{ color: isDark ? "#94a3b8" : "#64748b" }}>.</span>
              </RouterLink>
            </Link>
          </Heading>

          <HStack gap={2} display={{ base: "none", lg: "flex" }}>
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                label={label}
                pathname={location.pathname}
                isDark={isDark}
              />
            ))}
            <NavLink to="/chat" pathname={location.pathname} isDark={isDark}>
              AI
            </NavLink>
            <ColorModeToggle />
          </HStack>

          <HStack gap={2} display={{ base: "flex", lg: "none" }}>
            <ColorModeToggle />
            <MobileMenu />
          </HStack>
        </Flex>
      </Container>
    </NavWrap>
  );
}
