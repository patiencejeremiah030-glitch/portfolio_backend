import { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "fixed", bottom: 24, right: 24, zIndex: 90 }}
        >
          <IconButton
            aria-label="Scroll to top"
            size="lg"
            borderRadius="full"
            colorPalette="brand"
            shadow="xl"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            ↑
          </IconButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
