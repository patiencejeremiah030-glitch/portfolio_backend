import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { mediaUrl, proxiedImageUrl } from "../utils/mediaUrl";

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

/** Profile hero image — normalizes Imgur links and retries via image proxy if blocked. */
export default function ProfileAvatar({
  src,
  name,
  size = { base: "340px", lg: "440px" },
  ...boxProps
}) {
  const primary = mediaUrl(src);
  const [imgSrc, setImgSrc] = useState(primary);
  const [failed, setFailed] = useState(!primary);

  const handleError = () => {
    if (primary && imgSrc === primary) {
      const proxy = proxiedImageUrl(primary);
      if (proxy) {
        setImgSrc(proxy);
        return;
      }
    }
    setFailed(true);
  };

  if (!primary || failed) {
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
      src={imgSrc}
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
      referrerPolicy="no-referrer"
      onError={handleError}
      {...boxProps}
    />
  );
}
