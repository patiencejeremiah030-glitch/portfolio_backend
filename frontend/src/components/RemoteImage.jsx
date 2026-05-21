import { useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import { mediaUrl, proxiedImageUrl } from "../utils/mediaUrl";

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
    return fallback ?? null;
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={handleError}
      {...props}
    />
  );
}
