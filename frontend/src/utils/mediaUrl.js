const serverBase = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api").replace(
  /\/api\/?$/,
  ""
);

export function mediaUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${serverBase}${path.startsWith("/") ? path : `/${path}`}`;
}
