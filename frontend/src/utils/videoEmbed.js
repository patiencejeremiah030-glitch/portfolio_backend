/**
 * Turn YouTube / Vimeo page URLs into embed URLs for iframes.
 */

export function youtubeEmbedUrl(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();

  const shorts = trimmed.match(/youtube\.com\/shorts\/([\w-]{11})/i);
  if (shorts) return `https://www.youtube.com/embed/${shorts[1]}`;

  const watch = trimmed.match(
    /(?:youtube\.com\/watch\?.*v=|youtu\.be\/)([\w-]{11})/i
  );
  if (watch) return `https://www.youtube.com/embed/${watch[1]}`;

  const embed = trimmed.match(/youtube\.com\/embed\/([\w-]{11})/i);
  if (embed) return `https://www.youtube.com/embed/${embed[1]}`;

  return null;
}

export function vimeoEmbedUrl(url) {
  if (!url || typeof url !== "string") return null;
  const m = url.trim().match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (m) return `https://player.vimeo.com/video/${m[1]}`;
  return null;
}

/** Prefer YouTube, then Vimeo. */
export function externalVideoEmbedUrl(url) {
  return youtubeEmbedUrl(url) || vimeoEmbedUrl(url);
}

export function isDirectVideoFile(url) {
  if (!url || typeof url !== "string") return false;
  return /\.(mp4|webm|mov)(\?|$)/i.test(url);
}
