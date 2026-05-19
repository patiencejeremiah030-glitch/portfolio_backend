import { Box } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeVariants } from "./presets";

const MotionBox = motion.create(Box);

const directionOffset = {
  up: { y: 28, x: 0 },
  down: { y: -20, x: 0 },
  left: { y: 0, x: 24 },
  right: { y: 0, x: -24 },
  scale: { y: 12, x: 0, scale: 0.96 },
  none: { y: 0, x: 0 },
};

export default function FadeIn({
  children,
  delay = 0,
  y,
  duration = 0.55,
  direction = "up",
  asView = true,
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const offset = directionOffset[direction] || directionOffset.up;
  const finalY = y ?? offset.y;
  const variants = fadeVariants(reduceMotion, {
    y: finalY,
    x: offset.x,
    scale: offset.scale ?? 1,
  });

  const transition = reduceMotion
    ? { duration: 0.15, delay }
    : { duration, delay, ease: [0.22, 1, 0.36, 1] };

  if (reduceMotion) {
    return <Box {...props}>{children}</Box>;
  }

  if (asView) {
    return (
      <MotionBox
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={variants}
        transition={transition}
        {...props}
      >
        {children}
      </MotionBox>
    );
  }

  return (
    <MotionBox
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={transition}
      {...props}
    >
      {children}
    </MotionBox>
  );
}
