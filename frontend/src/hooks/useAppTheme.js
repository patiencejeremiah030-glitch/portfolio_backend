import { useTheme } from "next-themes";

/** Shared surface colors — keep in sync with index.css html.light / html.dark */
export const themeSurfaces = {
  light: {
    page: "#f8fafc",
    subtle: "#f1f5f9",
    nav: "rgba(248, 250, 252, 0.94)",
  },
  dark: {
    page: "#0f172a",
    subtle: "#1e293b",
    nav: "rgba(15, 23, 42, 0.94)",
  },
};

export default function useAppTheme() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const surfaces = isDark ? themeSurfaces.dark : themeSurfaces.light;

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return {
    theme,
    resolvedTheme,
    isDark,
    toggleTheme,
    pageBg: surfaces.page,
    subtleBg: surfaces.subtle,
    cardBg: isDark ? "rgba(30, 41, 59, 0.88)" : "rgba(255, 255, 255, 0.92)",
    cardBorder: isDark ? "rgba(148, 163, 184, 0.14)" : "rgba(148, 163, 184, 0.28)",
    glassBg: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.85)",
    glassBorder: isDark ? "rgba(148, 163, 184, 0.2)" : "rgba(148, 163, 184, 0.22)",
    textPrimary: isDark ? "#f8fafc" : "#0f172a",
    textSecondary: isDark ? "#94a3b8" : "#475569",
    textMuted: isDark ? "#64748b" : "#64748b",
    navBg: surfaces.nav,
    heroGradient: isDark
      ? "linear-gradient(160deg, #1e293b 0%, #0f172a 50%, #020617 100%)"
      : "linear-gradient(160deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)",
    accentGlow: isDark ? "brand.400" : "brand.600",
  };
}
