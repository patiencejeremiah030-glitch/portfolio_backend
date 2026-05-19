import { Badge, Box, HStack, Text, VStack } from "@chakra-ui/react";
import ContentCard from "./ContentCard";
import useAppTheme from "../hooks/useAppTheme";

export default function SkillCard({ skill }) {
  const { textPrimary, textSecondary, isDark } = useAppTheme();
  const level = Math.min(5, Math.max(1, skill.proficiency || 1));
  const pct = (level / 5) * 100;

  return (
    <ContentCard
      p={{ base: 6, md: 7 }}
      minH="180px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <VStack align="start" gap={3} w="full">
        <Box
          w={12}
          h={12}
          borderRadius="xl"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg={isDark ? "blue.900" : "blue.50"}
          color="blue.500"
          fontSize="xl"
          fontWeight="bold"
        >
          {skill.name?.charAt(0)?.toUpperCase() || "?"}
        </Box>
        <Text fontWeight="bold" fontSize="lg" color={textPrimary}>
          {skill.name}
        </Text>
        <Badge colorPalette="brand" variant="subtle" borderRadius="full" px={3}>
          {skill.category}
        </Badge>
      </VStack>

      <Box w="full" mt={5}>
        <HStack justify="space-between" mb={2}>
          <Text fontSize="xs" color={textSecondary} fontWeight="medium">
            Proficiency
          </Text>
          <Text fontSize="xs" color="brand.500" fontWeight="bold">
            {level}/5
          </Text>
        </HStack>
        <Box
          h="8px"
          borderRadius="full"
          bg={isDark ? "whiteAlpha.100" : "gray.100"}
          overflow="hidden"
        >
          <Box
            h="100%"
            w={`${pct}%`}
            borderRadius="full"
            bgGradient="to-r"
            gradientFrom="blue.500"
            gradientTo="brand.500"
            transition="width 0.4s ease"
          />
        </Box>
      </Box>
    </ContentCard>
  );
}
