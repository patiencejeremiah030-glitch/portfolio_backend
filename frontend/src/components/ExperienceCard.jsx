import { Badge, Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import ContentCard from "./ContentCard";
import useAppTheme from "../hooks/useAppTheme";
import { formatDateRange } from "../utils/apiHelpers";

export default function ExperienceCard({ job }) {
  const { textPrimary, textSecondary, isDark } = useAppTheme();

  return (
    <ContentCard p={{ base: 6, md: 8 }} minH="200px">
      <HStack justify="space-between" align="start" flexWrap="wrap" gap={3} mb={4}>
        <Box
          px={3}
          py={1}
          borderRadius="full"
          bg={isDark ? "blue.900" : "blue.50"}
          color="blue.500"
          fontSize="xs"
          fontWeight="bold"
          letterSpacing="wider"
        >
          EXPERIENCE
        </Box>
        {job.is_current && (
          <Badge colorPalette="green" variant="subtle" borderRadius="full">
            Current
          </Badge>
        )}
      </HStack>

      <VStack align="start" gap={2}>
        <Heading size="md" color={textPrimary} letterSpacing="-0.02em">
          {job.role}
        </Heading>
        <Text color="blue.500" fontWeight="semibold" fontSize="md">
          {job.company_name}
        </Text>
        <Text fontSize="sm" color={textSecondary}>
          {formatDateRange(job.start_date, job.end_date, job.is_current)}
        </Text>
      </VStack>

      {job.description && (
        <Text mt={5} lineHeight="tall" color={textSecondary} fontSize="sm">
          {job.description}
        </Text>
      )}
    </ContentCard>
  );
}
