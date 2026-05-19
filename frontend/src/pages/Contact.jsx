import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  HStack,
  Input,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import api from "../api";
import GradientText from "../components/GradientText";
import SectionHeading from "../components/SectionHeading";
import SocialLinks from "../components/SocialLinks";
import FadeIn from "../components/motion/FadeIn";
import { StaggerContainer, StaggerItem } from "../components/motion/Stagger";
import useAppTheme from "../hooks/useAppTheme";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState(null);
  const { isDark, textPrimary, textSecondary, glassBorder } = useAppTheme();

  useEffect(() => {
    api
      .get("/about/")
      .then((res) => setProfile(res.data))
      .catch(() => setProfile(null));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await api.post("/contact/", form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const contactItems = [
    profile?.email && {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    profile?.phone && {
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, "")}`,
    },
    profile?.location && {
      label: "Location",
      value: profile.location,
    },
  ].filter(Boolean);

  return (
    <Box pb={{ base: 12, md: 16 }}>
      <Container maxW="container.lg" px={{ base: 4, md: 8 }}>
        {/* Page intro */}
        <FadeIn>
          <Box pt={{ base: 2, md: 4 }} pb={{ base: 8, md: 10 }}>
            <Text
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="0.15em"
              textTransform="uppercase"
              color="brand.500"
              mb={2}
            >
              Contact
            </Text>
            <Heading
              as="h1"
              size={{ base: "2xl", md: "3xl" }}
              fontFamily="heading"
              fontWeight="800"
              letterSpacing="-0.03em"
              color={textPrimary}
              lineHeight="1.15"
              maxW="lg"
            >
              Let&apos;s get in <GradientText>touch</GradientText>
            </Heading>
            <Text mt={4} fontSize={{ base: "sm", md: "md" }} color={textSecondary} maxW="xl" lineHeight="tall">
              Whether you have a project in mind, a collaboration idea, or just want to say hello —
              I&apos;d love to hear from you.
            </Text>
          </Box>
        </FadeIn>

        <PageDivider isDark={isDark} mb={{ base: 8, md: 10 }} />

        {/* Contact details — open layout, no cards */}
        {(contactItems.length > 0 || profile) && (
          <FadeIn>
            <StaggerContainer
              display="grid"
              gridTemplateColumns={{
                base: "1fr",
                md:
                  contactItems.length >= 3
                    ? "repeat(3, 1fr)"
                    : contactItems.length === 2
                      ? "repeat(2, 1fr)"
                      : "1fr",
              }}
              gap={{ base: 6, md: 10 }}
              mb={{ base: 8, md: 10 }}
            >
              {contactItems.map((item) => (
                <StaggerItem key={item.label}>
                  <ContactDetail {...item} />
                </StaggerItem>
              ))}
            </StaggerContainer>

            {profile && (
              <Box mb={{ base: 8, md: 10 }}>
                <Text fontSize="sm" fontWeight="semibold" color={textPrimary} mb={3}>
                  Follow me
                </Text>
                <SocialLinks profile={profile} size="sm" />
              </Box>
            )}

            <PageDivider isDark={isDark} mb={{ base: 8, md: 10 }} />
          </FadeIn>
        )}

        {/* Main content: info + form side by side */}
        <Grid
          templateColumns={{ base: "1fr", lg: "minmax(0, 340px) minmax(0, 1fr)" }}
          gap={{ base: 10, lg: 16 }}
          alignItems="start"
        >
          <FadeIn>
            <VStack align="stretch" gap={8}>
              <Box>
                <SectionHeading
                  eyebrow="Before you write"
                  title="A few things to know"
                  compact
                  mb={4}
                />
                <Stack gap={5}>
                  <InfoLine
                    title="Response time"
                    text="I usually reply within 24–48 hours on business days."
                  />
                  <InfoLine
                    title="Portfolio AI"
                    text="Not sure what to ask? Chat with my AI first — it knows my projects and skills."
                  />
                  <Link
                    asChild
                    fontSize="sm"
                    fontWeight="semibold"
                    color="brand.500"
                    _hover={{ color: "brand.400", textDecoration: "none" }}
                  >
                    <RouterLink to="/chat">Go to AI chat →</RouterLink>
                  </Link>
                </Stack>
              </Box>
            </VStack>
          </FadeIn>

          <FadeIn delay={0.06}>
            <Box as="section" w="100%">
              <SectionHeading
                eyebrow="Message"
                title="Send a message"
                subtitle="Fill out the form and I'll get back to you as soon as I can."
                compact
                mb={{ base: 5, md: 6 }}
              />

              {status === "success" ? (
                <VStack align="start" gap={3} py={4}>
                  <Text fontSize="lg" fontWeight="bold" color={isDark ? "green.300" : "green.600"}>
                    Message sent — thank you!
                  </Text>
                  <Text fontSize="sm" color={textSecondary}>
                    I&apos;ll read your note and reply soon.
                  </Text>
                  <Button size="sm" variant="outline" onClick={() => setStatus(null)}>
                    Send another message
                  </Button>
                </VStack>
              ) : (
                <Box as="form" onSubmit={handleSubmit}>
                  <Stack gap={5}>
                    <SimpleGrid columns={{ base: 1, sm: 2 }} gap={5}>
                      <Field label="Name" textPrimary={textPrimary}>
                        <Input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          variant="outline"
                          size="md"
                          borderColor={glassBorder}
                          bg="transparent"
                          _focusVisible={inputFocus}
                        />
                      </Field>
                      <Field label="Email" textPrimary={textPrimary}>
                        <Input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          variant="outline"
                          size="md"
                          borderColor={glassBorder}
                          bg="transparent"
                          _focusVisible={inputFocus}
                        />
                      </Field>
                    </SimpleGrid>

                    <Field label="Subject" textPrimary={textPrimary}>
                      <Input
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        variant="outline"
                        size="md"
                        borderColor={glassBorder}
                        bg="transparent"
                        _focusVisible={inputFocus}
                      />
                    </Field>

                    <Field label="Message" textPrimary={textPrimary}>
                      <Textarea
                        name="message"
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        required
                        variant="outline"
                        size="md"
                        borderColor={glassBorder}
                        bg="transparent"
                        resize="vertical"
                        _focusVisible={inputFocus}
                      />
                    </Field>

                    <HStack gap={4} flexWrap="wrap" pt={1}>
                      <Button
                        type="submit"
                        colorPalette="brand"
                        size="md"
                        px={8}
                        loading={status === "sending"}
                      >
                        Send message
                      </Button>
                      <Text fontSize="xs" color={textSecondary}>
                        All fields are required
                      </Text>
                    </HStack>

                    {status === "error" && (
                      <Text color="red.500" fontSize="sm" fontWeight="medium">
                        Could not send your message. Please try again.
                      </Text>
                    )}
                  </Stack>
                </Box>
              )}
            </Box>
          </FadeIn>
        </Grid>
      </Container>
    </Box>
  );
}

const inputFocus = {
  borderColor: "brand.500",
  shadow: "none",
};

function PageDivider({ isDark, ...props }) {
  return (
    <Box
      h="1px"
      w="100%"
      bg={isDark ? "whiteAlpha.200" : "blackAlpha.100"}
      {...props}
    />
  );
}

function ContactDetail({ label, value, href }) {
  const { textPrimary, textSecondary } = useAppTheme();

  const valueEl = href ? (
    <Link
      href={href}
      fontSize={{ base: "md", md: "lg" }}
      fontWeight="semibold"
      color={textPrimary}
      _hover={{ color: "brand.500", textDecoration: "none" }}
    >
      {value}
    </Link>
  ) : (
    <Text fontSize={{ base: "md", md: "lg" }} fontWeight="semibold" color={textPrimary}>
      {value}
    </Text>
  );

  return (
    <Box>
      <Text
        fontSize="xs"
        fontWeight="bold"
        letterSpacing="0.12em"
        textTransform="uppercase"
        color="brand.500"
        mb={1}
      >
        {label}
      </Text>
      {valueEl}
    </Box>
  );
}

function InfoLine({ title, text }) {
  const { textPrimary, textSecondary } = useAppTheme();

  return (
    <Box>
      <Text fontWeight="semibold" fontSize="sm" color={textPrimary} mb={1}>
        {title}
      </Text>
      <Text fontSize="sm" color={textSecondary} lineHeight="tall">
        {text}
      </Text>
    </Box>
  );
}

function Field({ label, children, textPrimary }) {
  return (
    <Box>
      <Text fontWeight="medium" mb={2} color={textPrimary} fontSize="sm">
        {label}
      </Text>
      {children}
    </Box>
  );
}
