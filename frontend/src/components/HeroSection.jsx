import {
  Badge,
  Box,
  Button,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import ProfileAvatar from "./ProfileAvatar";
import GradientText from "./GradientText";
import SocialLinks from "./SocialLinks";
import useAppTheme from "../hooks/useAppTheme";

const MotionBox = motion.create(Box);

export default function HeroSection({ profile }) {
  const { isDark, textSecondary, glassBorder, glassBg } = useAppTheme();
  return (
    <Box position="relative" mb={{ base: 12, md: 16 }} pt={{ base: 4, md: 8 }}>
      <Box
        position="absolute"
        top="-20%"
        left="50%"
        transform="translateX(-50%)"
        w="min(900px, 120vw)"
        h="500px"
        pointerEvents="none"
        bg={
          isDark
            ? "radial-gradient(ellipse, rgba(59,130,246,0.3) 0%, transparent 70%)"
            : "radial-gradient(ellipse, rgba(59,130,246,0.18) 0%, transparent 70%)"
        }
        css={{ animation: "pulseGlow 8s ease-in-out infinite" }}
      />
      <MotionBox
        position="absolute"
        top="10%"
        right="5%"
        w="120px"
        h="120px"
        borderRadius="full"
        bg="blue.400"
        opacity={isDark ? 0.12 : 0.15}
        filter="blur(60px)"
        css={{ animation: "float 6s ease-in-out infinite" }}
      />
      <MotionBox
        position="absolute"
        bottom="20%"
        left="0"
        w="80px"
        h="80px"
        borderRadius="full"
        bg="blue.500"
        opacity={0.2}
        filter="blur(50px)"
        css={{ animation: "float 7s ease-in-out infinite reverse" }}
      />

      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        gap={{ base: 8, lg: 10 }}
        alignItems="center"
        minH={{ lg: "min(520px, 75vh)" }}
      >
        <VStack
          align={{ base: "center", lg: "start" }}
          gap={6}
          textAlign={{ base: "center", lg: "left" }}
          order={{ base: 2, lg: 1 }}
        >
          <MotionBox
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              px={4}
              py={1.5}
              borderRadius="full"
              bg={glassBg}
              borderWidth="1px"
              borderColor={glassBorder}
              colorPalette="brand"
              variant="subtle"
              fontSize="xs"
              fontWeight="semibold"
            >
              <Box
                as="span"
                display="inline-block"
                w={2}
                h={2}
                borderRadius="full"
                bg="green.400"
                mr={2}
                css={{ animation: "pulse 2s infinite" }}
              />
              Open to work · Full-stack developer
            </Badge>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color={textSecondary}
              fontWeight="medium"
              letterSpacing="wide"
              textTransform="uppercase"
            >
              Portfolio of
            </Text>
            <Text
              as="h1"
              fontSize={{ base: "2rem", sm: "2.5rem", md: "3rem" }}
              fontWeight="800"
              lineHeight="1.1"
              letterSpacing="-0.03em"
              fontFamily="heading"
              mt={2}
            >
              <GradientText>{profile.full_name}</GradientText>
            </Text>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Text
              fontSize={{ base: "md", md: "lg" }}
              fontWeight="medium"
              color={textSecondary}
              maxW="lg"
              lineHeight="snug"
            >
              {profile.headline}
            </Text>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <Text lineHeight="tall" color={textSecondary} maxW="lg" fontSize="sm">
              {profile.bio}
            </Text>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <HStack gap={4} flexWrap="wrap" justify={{ base: "center", lg: "start" }}>
              <Button
                asChild
                size="md"
                colorPalette="brand"
                px={6}
                borderRadius="full"
                shadow="lg"
                _hover={{ transform: "translateY(-2px)", shadow: "xl" }}
                transition="all 0.2s"
              >
                <RouterLink to="/projects">Explore projects</RouterLink>
              </Button>
              <Button
                asChild
                size="md"
                variant="outline"
                colorPalette="brand"
                px={6}
                borderRadius="full"
                bg={glassBg}
                borderColor={glassBorder}
                _hover={{ bg: isDark ? "whiteAlpha.100" : "brand.50" }}
              >
                <RouterLink to="/chat">Ask AI</RouterLink>
              </Button>
            </HStack>
          </MotionBox>

          <HStack justify={{ base: "center", lg: "start" }}>
            <SocialLinks profile={profile} />
          </HStack>
        </VStack>

        <MotionBox
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          display="flex"
          justifyContent="center"
          order={{ base: 1, lg: 2 }}
          w="100%"
        >
          <Box position="relative" w="fit-content" mx="auto">
            <Box
              position="absolute"
              inset="-6px"
              borderRadius="full"
              bgGradient="to-br"
              gradientFrom="blue.500"
              gradientTo="brand.500"
              opacity={0.45}
              filter="blur(10px)"
            />
            <Box
              position="relative"
              p="4px"
              borderRadius="full"
              bgGradient="to-br"
              gradientFrom="blue.400"
              gradientTo="brand.500"
            >
              <ProfileAvatar
                src={profile.avatar}
                name={profile.full_name}
                bg={isDark ? "#111827" : "white"}
              />
            </Box>
          </Box>
        </MotionBox>
      </SimpleGrid>
    </Box>
  );
}
