import { Box, Text } from "@chakra-ui/react";
import useAppTheme from "../hooks/useAppTheme";

export default function SkillsMarquee({ skills = [] }) {
  const { isDark, glassBorder, subtleBg } = useAppTheme();
  if (!skills.length) return null;

  const labels = skills.map((s) => s.name);
  const doubled = [...labels, ...labels];

  return (
    <Box
      as="section"
      mb={{ base: 12, md: 16 }}
      overflow="hidden"
      py={6}
      borderYWidth="1px"
      borderColor={glassBorder}
      bg={subtleBg}
    >
      <Text
        fontSize="xs"
        fontWeight="bold"
        letterSpacing="0.2em"
        textTransform="uppercase"
        color="brand.500"
        textAlign="center"
        mb={4}
      >
        Tech stack
      </Text>
      <Box
        display="flex"
        w="max-content"
        css={{
          animation: "marquee 40s linear infinite",
          "&:hover": { animationPlayState: "paused" },
        }}
      >
        {doubled.map((name, i) => (
          <Text
            key={`${name}-${i}`}
            flexShrink={0}
            px={6}
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="700"
            color={isDark ? "gray.500" : "gray.400"}
            _hover={{ color: "brand.500" }}
            transition="color 0.2s"
            whiteSpace="nowrap"
          >
            {name}
            <Box as="span" mx={4} color="brand.400" opacity={0.5}>
              /
            </Box>
          </Text>
        ))}
      </Box>
    </Box>
  );
}
