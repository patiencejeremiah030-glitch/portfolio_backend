import { useEffect, useState } from "react";
import { Box, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import api from "../api";
import { unwrapList, formatDateRange } from "../utils/apiHelpers";
import PageLoader from "../components/PageLoader";
import ApiError from "../components/ApiError";
import PageShell from "../components/PageShell";
import ContentCard from "../components/ContentCard";
import SocialLinks from "../components/SocialLinks";
import SkillCard from "../components/SkillCard";
import ExperienceCard from "../components/ExperienceCard";
import SectionHeading from "../components/SectionHeading";
import useAppTheme from "../hooks/useAppTheme";
import FadeIn from "../components/motion/FadeIn";

export default function About() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { textPrimary, textSecondary } = useAppTheme();

  useEffect(() => {
    Promise.all([
      api.get("/about/"),
      api.get("/skils/"),
      api.get("/experiences/"),
      api.get("/educations/"),
    ])
      .then(([profileRes, skillsRes, expRes, eduRes]) => {
        setProfile(profileRes.data);
        setSkills(unwrapList(skillsRes.data));
        setExperience(unwrapList(expRes.data));
        setEducation(unwrapList(eduRes.data));
      })
      .catch((err) => {
        const msg =
          err.response?.data?.detail ||
          err.message ||
          "Could not load about page data.";
        setError(msg);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;
  if (error) {
    return (
      <PageShell title="About">
        <ApiError message={error} />
      </PageShell>
    );
  }
  if (!profile) {
    return (
      <PageShell title="About">
        <ApiError message="No profile found. Add a Site Profile in Django admin." />
      </PageShell>
    );
  }

  return (
    <PageShell
      title="About me"
      subtitle="Background, skills, and experience."
      eyebrow="Profile"
      compact
    >
      <Stack gap={{ base: 10, md: 12 }}>
        <FadeIn>
          <ContentCard p={{ base: 6, md: 8 }}>
            <Text lineHeight="tall" color={textSecondary} fontSize="md">
              {profile.bio}
            </Text>
            <Stack gap={1} mt={6} color={textSecondary} fontSize="sm">
              <Text>{profile.email}</Text>
              {profile.location && <Text>{profile.location}</Text>}
            </Stack>
            <Box mt={6}>
              <SocialLinks profile={profile} />
            </Box>
          </ContentCard>
        </FadeIn>

        <Box>
          <SectionHeading
            eyebrow="Expertise"
            title="Core skills"
            subtitle="Technologies and tools I work with daily."
            mb={{ base: 6, md: 8 }}
          />
          {skills.length === 0 ? (
            <Text fontSize="sm" color={textSecondary}>
              No skills yet. Add them in Django admin under Skills.
            </Text>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={{ base: 5, md: 6 }}>
              {skills.map((skill, i) => (
                <FadeIn key={skill.id} delay={i * 0.05}>
                  <SkillCard skill={skill} />
                </FadeIn>
              ))}
            </SimpleGrid>
          )}
        </Box>

        <Box>
          <SectionHeading
            eyebrow="Career"
            title="Experience"
            subtitle="Roles and companies I've worked with."
            mb={{ base: 6, md: 8 }}
          />
          {experience.length === 0 ? (
            <Text fontSize="sm" color={textSecondary}>
              No experience entries yet. Add them in Django admin.
            </Text>
          ) : (
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 5, md: 6 }}>
              {experience.map((job, i) => (
                <FadeIn key={job.id} delay={i * 0.06}>
                  <ExperienceCard job={job} />
                </FadeIn>
              ))}
            </SimpleGrid>
          )}
        </Box>

        <Box>
          <SectionHeading
            eyebrow="Learning"
            title="Education"
            subtitle="Degrees and training."
            mb={{ base: 6, md: 8 }}
          />
          {education.length === 0 ? (
            <Text fontSize="sm" color={textSecondary}>
              No education entries yet. Add them in Django admin.
            </Text>
          ) : (
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 5, md: 6 }}>
              {education.map((edu, i) => (
                <FadeIn key={edu.id} delay={i * 0.06}>
                  <ContentCard p={{ base: 6, md: 8 }} minH="160px">
                    <Text
                      fontSize="xs"
                      fontWeight="bold"
                      color="brand.500"
                      letterSpacing="wider"
                      mb={3}
                    >
                      EDUCATION
                    </Text>
                    <Text fontWeight="bold" fontSize="lg" color={textPrimary}>
                      {edu.degree}
                    </Text>
                    <Text color="blue.500" fontWeight="semibold" mt={1}>
                      {edu.school_name}
                    </Text>
                    <Text fontSize="sm" color={textSecondary} mt={2}>
                      {formatDateRange(edu.start_date, edu.end_date, false)}
                    </Text>
                    {edu.field_of_study && (
                      <Text fontSize="sm" color={textSecondary} mt={2}>
                        {edu.field_of_study}
                      </Text>
                    )}
                    {edu.description && (
                      <Text mt={4} lineHeight="tall" color={textSecondary} fontSize="sm">
                        {edu.description}
                      </Text>
                    )}
                  </ContentCard>
                </FadeIn>
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Stack>
    </PageShell>
  );
}
