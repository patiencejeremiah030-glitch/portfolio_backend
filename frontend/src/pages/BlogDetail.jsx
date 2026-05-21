import { useEffect, useState } from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import api from "../api";
import PageLoader from "../components/PageLoader";
import ApiError from "../components/ApiError";
import PageShell from "../components/PageShell";
import ContentCard from "../components/ContentCard";
import useAppTheme from "../hooks/useAppTheme";
import RemoteImage from "../components/RemoteImage";

export default function BlogDetail() {
  const { textSecondary } = useAppTheme();
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/blog/${slug}/`)
      .then((res) => setPost(res.data))
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
        <RouterLink to="/blog">← Back to blog</RouterLink>
      </Button>
      <ContentCard p={post.cover_image ? 0 : { base: 5, md: 8 }} overflow="hidden">
        {post.cover_image && (
          <RemoteImage
            src={post.cover_image}
            alt={post.title}
            w="100%"
            maxH="360px"
            objectFit="cover"
          />
        )}
        <Box p={{ base: 5, md: 8 }}>
        <Heading size="xl" letterSpacing="-0.02em" lineHeight="shorter">
          {post.title}
        </Heading>
        <Text
          mt={8}
          lineHeight="tall"
          color={textSecondary}
          fontSize="md"
          whiteSpace="pre-wrap"
        >
          {post.content}
        </Text>
        </Box>
      </ContentCard>
    </PageShell>
  );
}
