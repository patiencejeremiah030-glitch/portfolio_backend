import { useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import { mediaUrl } from "../utils/mediaUrl";

/**
 * Renders API image paths or full URLs. Shows a fallback if the file 404s
 * (common on Render when media is not on persistent storage).
 */
export default function RemoteImage({
  src,
  alt = "",
  fallback,
  ...props
}) {
  const [failed, setFailed] = useState(false);
  const resolved = mediaUrl(src);

  if (!resolved || failed) {
    return fallback ?? null;
  }

  return (
    <Image
      src={resolved}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
