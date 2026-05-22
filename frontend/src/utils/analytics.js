/** Google Analytics 4 — set VITE_GA_MEASUREMENT_ID (e.g. G-XXXXXXXXXX) in Vercel / frontend/.env */

const MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID || "").trim();

let initialized = false;

export function getGaMeasurementId() {
  return MEASUREMENT_ID || null;
}

export function isAnalyticsEnabled() {
  return Boolean(MEASUREMENT_ID);
}

export function initGoogleAnalytics() {
  if (!MEASUREMENT_ID || initialized || typeof window === "undefined") {
    return;
  }
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID, { send_page_view: false });
}

export function trackPageView(pagePath) {
  if (!MEASUREMENT_ID || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("config", MEASUREMENT_ID, {
    page_path: pagePath,
  });
}
