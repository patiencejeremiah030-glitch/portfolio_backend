import { motion, useReducedMotion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { pageVariants } from "./presets";

export default function PageTransition() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const variants = pageVariants(reduceMotion);

  if (reduceMotion) {
    return <Outlet />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        style={{ width: "100%" }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
