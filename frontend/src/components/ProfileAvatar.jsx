import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { mediaUrl } from "../utils/mediaUrl";

function initials(name) {
  if (!name) return "?";
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/** Profile hero image — uses native img for maximum compatibility on Vercel. */
export default function ProfileAvatar({ src, name, size = { base: "340px", lg: "440px" }, ...boxProps }) {
  const [failed, setFailed] = useState(false);
  const resolved = mediaUrl(src);

  if (!resolved || failed) {
    return (
      <Box
        w={size}
        h={size}
        maxW="100%"
        borderRadius="full"
        bg="gray.700"
        display="flex"
        alignItems="center"
        justifyContent="center"
        {...boxProps}
      >
        <Text fontSize="4xl" fontWeight="bold" color="gray.300">
          {initials(name)}
        </Text>
      </Box>
    );
  }

  return (
    <Box
      as="img"
      src={resolved}
      alt={name || "Profile"}
      w={size}
      h={size}
      maxW="100%"
      borderRadius="full"
      objectFit="cover"
      objectPosition="center"
      display="block"
      loading="eager"
      decoding="async"
      onError={() => setFailed(true)}
      {...boxProps}
    />
  );
}
