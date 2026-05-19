import { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import api from "../api";
import { unwrapList } from "../utils/apiHelpers";
import PageLoader from "../components/PageLoader";
import ApiError from "../components/ApiError";
import PageShell from "../components/PageShell";
import ProjectCard from "../components/ProjectCard";
import FadeIn from "../components/motion/FadeIn";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/projects/")
      .then((res) => setProjects(unwrapList(res.data)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;
  if (error) {
    return (
      <PageShell title="Projects" eyebrow="Work">
        <ApiError message={error} />
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Projects"
      subtitle="Case studies and shipped products — from idea to deployment."
      eyebrow="Work"
    >
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 7, md: 9 }}>
        {projects.map((project, i) => (
          <FadeIn key={project.id} delay={i * 0.06}>
            <ProjectCard project={project} featured={project.featured} />
          </FadeIn>
        ))}
      </SimpleGrid>
    </PageShell>
  );
}
