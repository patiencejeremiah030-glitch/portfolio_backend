import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import ContentCard from "./ContentCard";
import SectionHeading from "./SectionHeading";
import useAppTheme from "../hooks/useAppTheme";

export default function HomeTestimonials({ items }) {
  const { textPrimary, textSecondary, isDark } = useAppTheme();

  if (!items?.length) return null;

  return (
    <Box as="section" mb={{ base: 12, md: 16 }}>
      <SectionHeading
        eyebrow="Testimonials"
        title="What people say"
        subtitle="Feedback from collaborators and clients."
        align="center"
      />
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {items.map((t) => (
          <ContentCard key={t.id} hover>
            <Text
              fontSize="4xl"
              lineHeight={1}
              bgGradient="to-br"
              gradientFrom="brand.400"
              gradientTo="cyan.400"
              bgClip="text"
              color="transparent"
              mb={4}
            >
              "
            </Text>
            <Text fontSize="sm" lineHeight="tall" color={textSecondary} fontStyle="italic">
              {t.quote}
            </Text>
            <Box
              mt={6}
              pt={4}
              borderTopWidth="1px"
              borderColor={isDark ? "whiteAlpha.100" : "gray.200"}
            >
              <Text fontWeight="bold" color={textPrimary}>
                {t.name}
              </Text>
              <Text fontSize="sm" color={textSecondary} mt={0.5}>
                {t.role}
                {t.company ? ` · ${t.company}` : ""}
              </Text>
            </Box>
          </ContentCard>
        ))}
      </SimpleGrid>
    </Box>
  );
}
