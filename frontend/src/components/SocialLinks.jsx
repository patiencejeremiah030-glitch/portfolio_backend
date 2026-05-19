import { HStack, Link } from "@chakra-ui/react";
import { profileSocials } from "../utils/profileSocials";
import useAppTheme from "../hooks/useAppTheme";

export default function SocialLinks({ profile, size = "sm" }) {
  const { isDark, glassBorder, glassBg } = useAppTheme();
  const socials = profileSocials(profile);

  if (!socials.length) return null;

  return (
    <HStack gap={2} flexWrap="wrap">
      {socials.map((s) => (
        <Link
          key={s.label}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          fontSize={size}
          fontWeight="semibold"
          px={3}
          py={1.5}
          borderRadius="full"
          borderWidth="1px"
          borderColor={glassBorder}
          bg={glassBg}
          color={isDark ? "gray.300" : "gray.600"}
          _hover={{
            color: "brand.500",
            borderColor: "brand.400",
            textDecoration: "none",
          }}
        >
          {s.label}
        </Link>
      ))}
    </HStack>
  );
}
