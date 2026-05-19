import { useEffect, useState } from "react";
import { Button, Heading, Text } from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import api from "../api";
import PageLoader from "../components/PageLoader";
import ApiError from "../components/ApiError";
import PageShell from "../components/PageShell";
import ContentCard from "../components/ContentCard";
import useAppTheme from "../hooks/useAppTheme";

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
      <ContentCard p={{ base: 5, md: 8 }}>
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
      </ContentCard>
    </PageShell>
  );
}
