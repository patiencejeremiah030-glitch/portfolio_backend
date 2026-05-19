/** Normalize admin URLs (with or without https://) for display and href. */
export function normalizeUrl(url) {
  if (url == null || url === "") return null;
  const trimmed = String(url).trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

const SOCIAL_FIELDS = [
  { key: "github_url", label: "GitHub" },
  { key: "linkedin_url", label: "LinkedIn" },
  { key: "youtube_url", label: "YouTube" },
  { key: "twitter_url", label: "Twitter" },
  { key: "instagram_url", label: "Instagram" },
  { key: "resume_url", label: "Resume" },
];

export function profileSocials(profile) {
  if (!profile) return [];
  return SOCIAL_FIELDS.map(({ key, label }) => ({
    label,
    url: normalizeUrl(profile[key]),
  })).filter((s) => s.url);
}
