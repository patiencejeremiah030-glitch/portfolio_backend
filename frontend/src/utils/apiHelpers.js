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
