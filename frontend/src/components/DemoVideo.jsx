import { AspectRatio, Box, Text } from "@chakra-ui/react";
import { mediaUrl } from "../utils/mediaUrl";
import {
  externalVideoEmbedUrl,
  isDirectVideoFile,
} from "../utils/videoEmbed";

/**
 * Shows a project/profile demo: YouTube/Vimeo embed OR uploaded file (Cloudinary).
 * Pass demoVideoUrl and/or demoVideo from the API.
 */
export default function DemoVideo({
  demoVideoUrl,
  demoVideo,
  title = "Demo video",
  maxW = "100%",
}) {
  const embedSrc = externalVideoEmbedUrl(demoVideoUrl);
  const fileSrc = demoVideo ? mediaUrl(demoVideo) : null;
  const showFile = fileSrc && isDirectVideoFile(fileSrc);

  if (!embedSrc && !showFile) return null;

  return (
    <Box maxW={maxW} w="100%">
      <Text fontSize="sm" fontWeight="semibold" mb={3} color="fg.muted">
        {title}
      </Text>
      <AspectRatio ratio={16 / 9} borderRadius="lg" overflow="hidden">
        {embedSrc ? (
          <Box
            as="iframe"
            src={embedSrc}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            w="100%"
            h="100%"
            border={0}
          />
        ) : (
          <Box
            as="video"
            src={fileSrc}
            controls
            playsInline
            w="100%"
            h="100%"
            objectFit="contain"
            bg="black"
          />
        )}
      </AspectRatio>
    </Box>
  );
}
