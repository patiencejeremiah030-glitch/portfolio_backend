import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import ContentCard from "./ContentCard";
import FadeIn from "./motion/FadeIn";
import useAppTheme from "../hooks/useAppTheme";

export default function AuthFormLayout({ title, subtitle, children }) {
  const { textPrimary, textSecondary } = useAppTheme();

  return (
    <Container maxW="md" px={{ base: 4, md: 8 }} py={{ base: 8, md: 12 }}>
      <FadeIn>
        <VStack gap={2} mb={8} textAlign="center">
          <Heading
            as="h1"
            size="xl"
            fontFamily="heading"
            letterSpacing="-0.03em"
            color={textPrimary}
          >
            {title}
          </Heading>
          {subtitle && (
            <Text color={textSecondary} fontSize="sm" maxW="sm">
              {subtitle}
            </Text>
          )}
        </VStack>
        <ContentCard p={{ base: 6, md: 8 }}>{children}</ContentCard>
      </FadeIn>
    </Container>
  );
}

export function AuthField({ label, children, textPrimary }) {
  return (
    <Box w="full">
      <Text fontSize="sm" fontWeight="semibold" color={textPrimary} mb={2}>
        {label}
      </Text>
      {children}
    </Box>
  );
}
