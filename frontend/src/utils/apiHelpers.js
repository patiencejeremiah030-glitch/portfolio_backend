/** Turn axios / network failures into a short user-facing message. */
export function formatApiError(err) {
  if (!err) return "Unknown error";
  const detail = err.response?.data?.detail;
  if (detail) return typeof detail === "string" ? detail : JSON.stringify(detail);
  if (err.code === "ERR_NETWORK") {
    const base = err.config?.baseURL || "unknown API URL";
    return `Cannot reach the API at ${base}. On Vercel set VITE_API_URL to your Render URL (e.g. https://portfolio-api.onrender.com/api) and redeploy. On Render check the service is Live and CORS allows your Vercel domain.`;
  }
  const status = err.response?.status;
  const url = err.config?.baseURL
    ? `${err.config.baseURL}${err.config.url || ""}`
    : err.config?.url;
  if (status === 404) {
    return `API not found (${url || "unknown URL"}). Set VITE_API_URL to your Render API, e.g. https://portfolio-api.onrender.com/api`;
  }
  return err.message || "Request failed";
}

/** DRF list endpoints return an array; paginated APIs return { results: [...] }. */
export function unwrapList(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

/** Format API date strings for display (e.g. 2024-01-15 → Jan 2024). */
export function formatDisplayDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function formatDateRange(start, end, isCurrent = false) {
  const startLabel = formatDisplayDate(start);
  if (isCurrent) return `${startLabel} – Present`;
  const endLabel = formatDisplayDate(end);
  if (startLabel && endLabel) return `${startLabel} – ${endLabel}`;
  return startLabel || endLabel || "";
}
