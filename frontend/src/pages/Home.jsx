import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import api from "../api";
import { formatApiError, unwrapList } from "../utils/apiHelpers";
import PageLoader from "../components/PageLoader";
import ApiError from "../components/ApiError";
import ContentCard from "../components/ContentCard";
import HeroSection from "../components/HeroSection";
import SkillsMarquee from "../components/SkillsMarquee";
import ProjectCard from "../components/ProjectCard";
import HomeTimeline, { buildTimelineItems } from "../components/HomeTimeline";
import HomeTestimonials from "../components/HomeTestimonials";
import SectionHeading from "../components/SectionHeading";
import FadeIn from "../components/motion/FadeIn";
import { testimonials } from "../data/testimonials";
import useAppTheme from "../hooks/useAppTheme";

function yearsFromExperience(experiences) {
  if (!experiences?.length) return "3+";
  const dates = experiences
    .map((e) => new Date(e.start_date))
    .filter((d) => !Number.isNaN(d.getTime()));
  if (!dates.length) return "3+";
  const earliest = new Date(Math.min(...dates));
  const years = Math.floor((Date.now() - earliest) / (365.25 * 24 * 60 * 60 * 1000));
  return `${Math.max(1, years)}+`;
}

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { heroGradient, isDark, textSecondary, glassBorder } = useAppTheme();

  useEffect(() => {
    const requests = [
      api.get("/about/"),
      api.get("/projects/"),
      api.get("/skils/"),
      api.get("/experiences/"),
      api.get("/educations/"),
    ];

    Promise.allSettled(requests)
      .then(([about, projectsRes, skillsRes, expRes, eduRes]) => {
        if (about.status === "fulfilled") {
          setProfile(about.value.data);
        } else {
          setError(formatApiError(about.reason));
          return;
        }
        if (projectsRes.status === "fulfilled") {
          setProjects(unwrapList(projectsRes.value.data));
        }
        if (skillsRes.status === "fulfilled") {
          setSkills(unwrapList(skillsRes.value.data));
        }
        if (expRes.status === "fulfilled") {
          const expList = unwrapList(expRes.value.data);
          setExperiences(expList);
          const eduList =
            eduRes.status === "fulfilled" ? unwrapList(eduRes.value.data) : [];
          setTimeline(buildTimelineItems(expList, eduList));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const featured = useMemo(
    () => projects.filter((p) => p.featured).slice(0, 3),
    [projects]
  );
  const showcase = featured.length ? featured : projects.slice(0, 3);

  const stats = useMemo(
    () => [
      { label: "Years experience", value: yearsFromExperience(experiences) },
      { label: "Projects shipped", value: String(projects.length || "—") },
      { label: "Core skills", value: String(skills.length || "—") },
    ],
    [experiences, projects.length, skills.length]
  );

  if (loading) return <PageLoader label="Loading portfolio…" />;
  if (error) {
    return (
      <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
        <ApiError message={error} />
      </Container>
    );
  }
  if (!profile) {
    return (
      <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
        <ApiError message="No profile found. Add a Site Profile in Django admin." />
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
      <HeroSection profile={profile} />
      <SkillsMarquee skills={skills} />

      <FadeIn>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 5, md: 6 }} mb={{ base: 12, md: 16 }}>
          {stats.map((s) => (
            <ContentCard
              key={s.label}
              hover
              textAlign="center"
              py={{ base: 8, md: 10 }}
              px={6}
              minH="140px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Text
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="800"
                fontFamily="heading"
                bgGradient="to-r"
                gradientFrom="blue.500"
                gradientTo="brand.500"
                bgClip="text"
                color="transparent"
              >
                {s.value}
              </Text>
              <Text fontSize="md" color={textSecondary} mt={3} fontWeight="semibold">
                {s.label}
              </Text>
            </ContentCard>
          ))}
        </SimpleGrid>
      </FadeIn>

      {showcase.length > 0 && (
        <Box as="section" mb={{ base: 12, md: 16 }}>
          <FadeIn>
            <SectionHeading
              eyebrow="Portfolio"
              title="Selected work"
              subtitle="Real projects — design, code, and delivery."
            />
          </FadeIn>
          <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6}>
            {showcase.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.08}>
                <Box gridColumn={i === 0 && showcase.length > 1 ? { lg: "span 2" } : undefined}>
                  <ProjectCard project={p} featured={i === 0} />
                </Box>
              </FadeIn>
            ))}
          </SimpleGrid>
          <HStack justify="center" mt={8}>
            <Button asChild variant="outline" colorPalette="brand" borderRadius="full" px={8}>
              <RouterLink to="/projects">View all projects</RouterLink>
            </Button>
          </HStack>
        </Box>
      )}

      <FadeIn>
        <HomeTimeline items={timeline} />
      </FadeIn>
      <FadeIn>
        <HomeTestimonials items={testimonials} />
      </FadeIn>

      <FadeIn>
        <Box
          textAlign="center"
          py={{ base: 12, md: 16 }}
          px={8}
          borderRadius="3xl"
          position="relative"
          overflow="hidden"
          bg={heroGradient}
          borderWidth="1px"
          borderColor={glassBorder}
          backdropFilter="blur(16px)"
        >
          <Box
            position="absolute"
            inset={0}
            pointerEvents="none"
            bgGradient="to-r"
            gradientFrom="brand.500"
            gradientTo="cyan.400"
            opacity={0.08}
          />
          <Box position="relative">
            <Heading
              size={{ base: "lg", md: "xl" }}
              fontFamily="heading"
              letterSpacing="-0.03em"
              mb={4}
            >
              Ready to create something exceptional?
            </Heading>
            <Text color={textSecondary} mb={8} maxW="lg" mx="auto" fontSize="lg">
              Whether it's a product build, API, or full-stack app — let's talk.
            </Text>
            <HStack gap={4} justify="center" flexWrap="wrap">
              <Button
                asChild
                colorPalette="brand"
                size="lg"
                borderRadius="full"
                px={10}
                shadow="lg"
              >
                <RouterLink to="/contact">Start a conversation</RouterLink>
              </Button>
              <Button
                asChild
                variant="outline"
                colorPalette="brand"
                size="lg"
                borderRadius="full"
                px={10}
              >
                <RouterLink to="/chat">Ask AI</RouterLink>
              </Button>
            </HStack>
          </Box>
        </Box>
      </FadeIn>
    </Container>
  );
}
