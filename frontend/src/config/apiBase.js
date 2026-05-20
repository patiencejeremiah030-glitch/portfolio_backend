/** Set in Vercel → Environment Variables, then redeploy the frontend. */
const DEFAULT_PRODUCTION_API = "https://portfolio-api.onrender.com/api";

export function getApiBaseUrl() {
  const fromEnv = (import.meta.env.VITE_API_URL || "").trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;

  if (import.meta.env.PROD) {
    console.warn(
      "[portfolio] VITE_API_URL is missing. Using default API:",
      DEFAULT_PRODUCTION_API,
      "— add VITE_API_URL in Vercel and redeploy for a permanent fix."
    );
    return DEFAULT_PRODUCTION_API;
  }

  return "/api";
}

export function getMediaServerBase() {
  return getApiBaseUrl().replace(/\/api\/?$/, "");
}
