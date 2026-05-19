import { Container } from "@chakra-ui/react";
import PageHeader from "./PageHeader";
import FadeIn from "./motion/FadeIn";

export default function PageShell({
  title,
  subtitle,
  eyebrow = "Page",
  children,
  maxW = "container.xl",
  compact = false,
}) {
  return (
    <Container maxW={maxW} px={{ base: 4, md: 8 }}>
      {(title || subtitle) && (
        <FadeIn direction="up" y={20} duration={0.5}>
          <PageHeader
            title={title}
            subtitle={subtitle}
            eyebrow={eyebrow}
            compact={compact}
          />
        </FadeIn>
      )}
      <FadeIn delay={0.08} direction="up" y={16} duration={0.5}>
        {children}
      </FadeIn>
    </Container>
  );
}
