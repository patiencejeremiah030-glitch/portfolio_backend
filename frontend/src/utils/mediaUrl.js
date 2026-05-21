import { getMediaServerBase } from "../config/apiBase";

export function mediaUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;

  const serverBase = getMediaServerBase();
  let mediaPath = path.startsWith("/") ? path : `/${path}`;
  if (!mediaPath.startsWith("/media/")) {
    mediaPath = `/media${mediaPath}`;
  }
  return `${serverBase}${mediaPath}`;
}
