import { useEffect, useState } from "react";
import { Box, Button, Heading, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import api from "../api";
import RemoteImage from "../components/RemoteImage";
import DemoVideo from "../components/DemoVideo";
import PageLoader from "../components/PageLoader";
import ApiError from "../components/ApiError";
import PageShell from "../components/PageShell";
import ContentCard from "../components/ContentCard";
import useAppTheme from "../hooks/useAppTheme";

export default function ProjectDetail() {
  const { textSecondary } = useAppTheme();
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/projects/${slug}/`)
      .then((res) => setProject(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <PageLoader />;
  if (error) {
    return (
      <PageShell>
        <ApiError message={error} />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Button
        asChild
        variant="ghost"
        colorPalette="brand"
        mb={6}
        size="sm"
      >
        <RouterLink to="/projects">← Back to projects</RouterLink>
      </Button>
      <ContentCard p={{ base: 5, md: 8 }}>
        {project.image && (
          <RemoteImage
            src={project.image}
            alt={project.title}
            w="100%"
            maxH="420px"
            objectFit="cover"
            borderRadius="lg"
            mb={8}
          />
        )}
        <Heading size="xl" letterSpacing="-0.02em">
          {project.title}
        </Heading>
        <Text color="brand.700" fontWeight="medium" mt={2}>
          {project.tech_stack}
        </Text>
        {(project.demo_video_url || project.demo_video) && (
          <Box mt={8}>
            <DemoVideo
              demoVideoUrl={project.demo_video_url}
              demoVideo={project.demo_video}
              title="Project demo"
            />
          </Box>
        )}
        <Text
          mt={8}
          lineHeight="tall"
          color={textSecondary}
          fontSize="md"
          wordBreak="break-word"
          overflowWrap="anywhere"
        >
          {project.description}
        </Text>
        {project.live_url && (
          <Link
            href={project.live_url}
            target="_blank"
            color="brand.700"
            fontWeight="semibold"
            mt={6}
            display="inline-block"
            wordBreak="break-all"
            overflowWrap="anywhere"
            maxW="100%"
          >
            Open live demo →
          </Link>
        )}
      </ContentCard>
    </PageShell>
  );
}
