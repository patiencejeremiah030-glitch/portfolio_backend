import { Box, Container, Text, VStack } from "@chakra-ui/react";
import FadeIn from "./motion/FadeIn";
import useAppTheme from "../hooks/useAppTheme";

export default function Footer() {
  const { cardBorder, pageBg, isDark } = useAppTheme();

  return (
    <FadeIn asView direction="up" y={16} duration={0.5}>
    <Box
      as="footer"
      borderTopWidth="1px"
      borderColor={cardBorder}
      bg={pageBg}
      py={{ base: 8, md: 10 }}
      mt={8}
    >
      <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
        <VStack gap={2}>
          <Text
            fontSize="sm"
            fontWeight="semibold"
            color={isDark ? "gray.300" : "gray.700"}
            textAlign="center"
          >
            AUDREY portfolio · made with ❤️
          </Text>
          <Text fontSize="sm" color="gray.500" textAlign="center">
            All rights reserved © 2026
          </Text>
        </VStack>
      </Container>
    </Box>
    </FadeIn>
  );
}
