import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Syne', 'Plus Jakarta Sans', system-ui, sans-serif" },
        body: { value: "'Plus Jakarta Sans', system-ui, sans-serif" },
      },
      colors: {
        brand: {
          50: { value: "#eef2ff" },
          100: { value: "#e0e7ff" },
          200: { value: "#c7d2fe" },
          300: { value: "#a5b4fc" },
          400: { value: "#818cf8" },
          500: { value: "#6366f1" },
          600: { value: "#4f46e5" },
          700: { value: "#4338ca" },
          800: { value: "#3730a3" },
          900: { value: "#312e81" },
        },
      },
      radii: {
        card: { value: "24px" },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: "{colors.brand.600}" },
          contrast: { value: "{colors.white}" },
          fg: { value: "{colors.brand.600}" },
          muted: { value: "{colors.brand.100}" },
          subtle: { value: "{colors.brand.50}" },
          emphasized: { value: "{colors.brand.700}" },
          focusRing: { value: "{colors.brand.500}" },
        },
      },
    },
  },
});
