import { useEffect } from "react";
import { mediaUrl } from "../utils/mediaUrl";

function setMeta(property, content) {
  if (!content) return;
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Updates Open Graph tags for link previews (Vercel, social apps). */
export default function usePageMeta({ title, description, image }) {
  useEffect(() => {
    if (title) {
      document.title = title;
      setMeta("og:title", title);
    }
    if (description) {
      setMeta("og:description", description);
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", description);
    }
    const imageUrl = mediaUrl(image);
    if (imageUrl) {
      setMeta("og:image", imageUrl);
      setMeta("og:image:secure_url", imageUrl);
    }
  }, [title, description, image]);
}
