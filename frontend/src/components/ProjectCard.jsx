import { Badge, Box, Button, Heading, HStack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import RemoteImage from "./RemoteImage";
import ContentCard from "./ContentCard";
import useAppTheme from "../hooks/useAppTheme";

export default function ProjectCard({ project, featured = false }) {
  const { textSecondary, isDark } = useAppTheme();
  const imageH = featured ? "300px" : "240px";

  return (
    <ContentCard
      p={0}
      overflow="hidden"
      h="100%"
      display="flex"
      flexDirection="column"
      _hover={{
        "& .project-img": { transform: "scale(1.05)" },
        "& .project-overlay": { opacity: 0.55 },
      }}
    >
      <Box position="relative" overflow="hidden" h={imageH}>
        {project.image ? (
          <>
            <RemoteImage
              className="project-img"
              src={project.image}
              alt={project.title}
              w="100%"
              h="100%"
              objectFit="cover"
              transition="transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
            />
            <Box
              className="project-overlay"
              position="absolute"
              inset={0}
              bgGradient="to-t"
              gradientFrom={isDark ? "gray.950" : "gray.900"}
              gradientTo="transparent"
              opacity={0.35}
              transition="opacity 0.3s"
            />
          </>
        ) : (
          <Box
            h="100%"
            bgGradient="to-br"
            gradientFrom="blue.600"
            gradientTo="brand.600"
            opacity={0.9}
          />
        )}
        {project.featured && (
          <Badge
            position="absolute"
            top={4}
            right={4}
            colorPalette="brand"
            variant="solid"
            borderRadius="full"
            px={3}
            py={1}
          >
            Featured
          </Badge>
        )}
      </Box>

      <Box
        p={{ base: 6, md: 8 }}
        flex={1}
        display="flex"
        flexDirection="column"
        gap={4}
      >
        <Heading size={featured ? "lg" : "md"} letterSpacing="-0.02em">
          {project.title}
        </Heading>
        <Text color={textSecondary} lineHeight="tall" flex={1} fontSize="sm">
          {project.summary}
        </Text>
        {project.tech_stack && (
          <HStack gap={2} flexWrap="wrap">
            {project.tech_stack.split(",").slice(0, 5).map((tech) => (
              <Badge
                key={tech.trim()}
                variant="subtle"
                colorPalette="brand"
                borderRadius="full"
                px={3}
                py={1}
              >
                {tech.trim()}
              </Badge>
            ))}
          </HStack>
        )}
        <Button
          asChild
          colorPalette="brand"
          size="md"
          borderRadius="full"
          w={{ base: "full", sm: "fit-content" }}
          mt={2}
        >
          <RouterLink to={`/projects/${project.slug}`}>View project</RouterLink>
        </Button>
      </Box>
    </ContentCard>
  );
}
