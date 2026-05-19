import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import ContentCard from "./ContentCard";
import SectionHeading from "./SectionHeading";
import useAppTheme from "../hooks/useAppTheme";
import { formatDateRange } from "../utils/apiHelpers";

export function buildTimelineItems(experiences = [], educations = []) {
  const work = (experiences || []).map((e) => ({
    id: `exp-${e.id}`,
    kind: "work",
    title: e.role,
    subtitle: e.company_name,
    range: formatDateRange(e.start_date, e.end_date, e.is_current),
    description: e.description,
    sortKey: e.start_date || "",
  }));

  const school = (educations || []).map((e) => ({
    id: `edu-${e.id}`,
    kind: "education",
    title: e.degree,
    subtitle: e.school_name,
    range: formatDateRange(e.start_date, e.end_date, false),
    description: e.description || e.field_of_study,
    sortKey: e.start_date || "",
  }));

  return [...work, ...school].sort((a, b) => {
    const da = new Date(a.sortKey).getTime() || 0;
    const db = new Date(b.sortKey).getTime() || 0;
    return db - da;
  });
}

export default function HomeTimeline({ items }) {
  const { textPrimary, textSecondary, isDark } = useAppTheme();

  if (!items.length) return null;

  return (
    <Box as="section" mb={{ base: 12, md: 16 }}>
      <SectionHeading
        eyebrow="Career"
        title="My journey"
        subtitle="Experience and education that shaped how I build."
      />
      <VStack align="stretch" gap={0} position="relative" pl={{ base: 6, md: 8 }}>
        <Box
          position="absolute"
          left={{ base: "10px", md: "14px" }}
          top={2}
          bottom={2}
          w="2px"
          bgGradient="to-b"
          gradientFrom="brand.500"
          gradientTo="blue.400"
          borderRadius="full"
          opacity={0.6}
        />
        {items.map((item, index) => (
          <Box key={item.id} position="relative" pb={index < items.length - 1 ? 6 : 0}>
            <Box
              position="absolute"
              left={{ base: "-22px", md: "-26px" }}
              top={1}
              w={3}
              h={3}
              borderRadius="full"
              bg="brand.500"
              boxShadow={`0 0 12px ${isDark ? "rgba(129,140,248,0.8)" : "rgba(99,102,241,0.6)"}`}
              borderWidth="3px"
              borderColor={isDark ? "gray.950" : "gray.50"}
              zIndex={1}
            />
            <ContentCard hover={false}>
              <HStack justify="space-between" flexWrap="wrap" gap={2} mb={2}>
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  color="brand.500"
                >
                  {item.kind === "work" ? "Experience" : "Education"}
                </Text>
                <Text fontSize="sm" color={textSecondary}>
                  {item.range}
                </Text>
              </HStack>
              <Heading size="sm" color={textPrimary} fontFamily="heading">
                {item.title}
              </Heading>
              <Text fontWeight="medium" color="blue.500" mt={1}>
                {item.subtitle}
              </Text>
              {item.description && (
                <Text
                  mt={3}
                  fontSize="sm"
                  color={textSecondary}
                  lineHeight="tall"
                  css={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.description}
                </Text>
              )}
            </ContentCard>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
