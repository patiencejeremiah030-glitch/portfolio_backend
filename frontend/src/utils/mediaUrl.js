import { getMediaServerBase } from "../config/apiBase";

/**
 * Imgur page URLs do not work in <img>. Convert to i.imgur.com/....jpg
 */
export function normalizeImageUrl(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();

  const imgurPage = trimmed.match(/^https?:\/\/(?:www\.)?imgur\.com\/([a-zA-Z0-9]+)\/?$/i);
  if (imgurPage) {
    return `https://i.imgur.com/${imgurPage[1]}.jpg`;
  }

  const imgurDirect = trimmed.match(/^https?:\/\/i\.imgur\.com\/([a-zA-Z0-9]+)\/?$/i);
  if (imgurDirect) {
    return `https://i.imgur.com/${imgurDirect[1]}.jpg`;
  }

  return trimmed;
}

/** Optional CDN proxy when host blocks hotlinking (Imgur, etc.). */
export function proxiedImageUrl(url) {
  const normalized = normalizeImageUrl(url);
  if (!normalized) return null;
  const withoutScheme = normalized.replace(/^https?:\/\//, "");
  return `https://images.weserv.nl/?url=${encodeURIComponent(withoutScheme)}`;
}

export function mediaUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return normalizeImageUrl(path);

  const serverBase = getMediaServerBase();
  let mediaPath = path.startsWith("/") ? path : `/${path}`;
  if (!mediaPath.startsWith("/media/")) {
    mediaPath = `/media${mediaPath}`;
  }
  return `${serverBase}${mediaPath}`;
}
