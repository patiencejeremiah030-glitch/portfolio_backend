import { Box } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import useAppTheme from "../hooks/useAppTheme";

const MotionBox = motion.create(Box);

export default function ContentCard({ children, hover = true, ...props }) {
  const { cardBg, cardBorder, isDark } = useAppTheme();
  const reduceMotion = useReducedMotion();

  const baseStyles = {
    bg: cardBg,
    borderWidth: "1px",
    borderColor: cardBorder,
    borderRadius: "2xl",
    p: { base: 5, md: 6 },
    backdropFilter: "blur(12px)",
    shadow: isDark ? "0 4px 24px rgba(0,0,0,0.4)" : "0 4px 24px rgba(99,102,241,0.08)",
  };

  if (!hover || reduceMotion) {
    return (
      <Box
        {...baseStyles}
        transition="border-color 0.3s ease, box-shadow 0.3s ease"
        _hover={
          hover
            ? {
                shadow: isDark
                  ? "0 12px 40px rgba(99,102,241,0.15)"
                  : "0 12px 40px rgba(99,102,241,0.12)",
                borderColor: isDark ? "brand.700" : "brand.300",
              }
            : undefined
        }
        {...props}
      >
        {children}
      </Box>
    );
  }

  return (
    <MotionBox
      {...baseStyles}
      whileHover={{
        y: -6,
        boxShadow: isDark
          ? "0 16px 48px rgba(99,102,241,0.2)"
          : "0 16px 48px rgba(99,102,241,0.15)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      {...props}
    >
      {children}
    </MotionBox>
  );
}
