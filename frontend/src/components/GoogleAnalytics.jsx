import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGoogleAnalytics, trackPageView } from "../utils/analytics";

/** Sends a GA4 page_view on each client-side route change. */
export default function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    initGoogleAnalytics();
  }, []);

  useEffect(() => {
    const path = location.pathname + location.search;
    trackPageView(path);
  }, [location.pathname, location.search]);

  return null;
}
