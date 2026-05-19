import { Box, Center, Text, VStack } from "@chakra-ui/react";
import GradientText from "./GradientText";
import useAppTheme from "../hooks/useAppTheme";

export default function PageLoader({ label = "Loading…" }) {
  const { isDark } = useAppTheme();

  return (
    <Center py={32}>
      <VStack gap={6}>
        <Box position="relative" w={12} h={12}>
          <Box
            position="absolute"
            inset={0}
            borderRadius="full"
            borderWidth="3px"
            borderColor={isDark ? "gray.800" : "gray.200"}
          />
          <Box
            position="absolute"
            inset={0}
            borderRadius="full"
            borderWidth="3px"
            borderTopColor="brand.500"
            borderRightColor="cyan.400"
            css={{ animation: "spinSlow 0.8s linear infinite" }}
          />
        </Box>
        <Text fontSize="lg" fontWeight="semibold">
          <GradientText>{label}</GradientText>
        </Text>
      </VStack>
    </Center>
  );
}
