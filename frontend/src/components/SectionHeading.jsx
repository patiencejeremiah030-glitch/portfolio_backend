import { Heading, Text, VStack } from "@chakra-ui/react";
import useAppTheme from "../hooks/useAppTheme";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "start",
  mb = { base: 6, md: 8 },
  compact = false,
}) {
  const { textPrimary, textSecondary, isDark } = useAppTheme();

  return (
    <VStack align={align} gap={2} mb={mb} textAlign={align === "center" ? "center" : "left"}>
      {eyebrow && (
        <Text
          fontSize="xs"
          fontWeight="bold"
          letterSpacing="0.15em"
          textTransform="uppercase"
          color="brand.500"
        >
          {eyebrow}
        </Text>
      )}
      <Heading
        size={compact ? { base: "lg", md: "xl" } : { base: "xl", md: "2xl" }}
        letterSpacing="-0.02em"
        color={textPrimary}
        fontFamily="heading"
        fontWeight="bold"
        position="relative"
        _after={{
          content: '""',
          display: "block",
          w: "40px",
          h: "3px",
          mt: 2,
          mx: align === "center" ? "auto" : 0,
          borderRadius: "full",
          bgGradient: "to-r",
          gradientFrom: "brand.500",
          gradientTo: isDark ? "blue.400" : "blue.500",
        }}
      >
        {title}
      </Heading>
      {subtitle && (
        <Text
          fontSize={compact ? "sm" : { base: "sm", md: "md" }}
          color={textSecondary}
          maxW="2xl"
          lineHeight="tall"
        >
          {subtitle}
        </Text>
      )}
    </VStack>
  );
}
