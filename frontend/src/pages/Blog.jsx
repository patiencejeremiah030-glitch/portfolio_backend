import { useEffect, useState } from "react";
import { Heading, Stack, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import api from "../api";
import PageLoader from "../components/PageLoader";
import ApiError from "../components/ApiError";
import PageShell from "../components/PageShell";
import ContentCard from "../components/ContentCard";
import useAppTheme from "../hooks/useAppTheme";

export default function Blog() {
  const { textSecondary } = useAppTheme();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/blog/")
      .then((res) => setPosts(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;
  if (error) {
    return (
      <PageShell title="Blog">
        <ApiError message={error} />
      </PageShell>
    );
  }

  return (
    <PageShell title="Blog" subtitle="Notes, tutorials, and thoughts.">
      <Stack gap={4}>
        {posts.map((post) => (
          <ContentCard key={post.id}>
            <Heading size="md" letterSpacing="-0.02em">
              {post.title}
            </Heading>
            <Text mt={3} color={textSecondary} lineHeight="tall">
              {post.excerpt}
            </Text>
            <Link
              asChild
              color="brand.700"
              fontWeight="semibold"
              mt={4}
              display="inline-block"
            >
              <RouterLink to={`/blog/${post.slug}`}>Read article →</RouterLink>
            </Link>
          </ContentCard>
        ))}
      </Stack>
    </PageShell>
  );
}
