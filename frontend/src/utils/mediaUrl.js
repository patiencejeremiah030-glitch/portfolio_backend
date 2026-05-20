import { getMediaServerBase } from "../config/apiBase";

export function mediaUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const serverBase = getMediaServerBase();
  return `${serverBase}${path.startsWith("/") ? path : `/${path}`}`;
}
