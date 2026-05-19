import { Box } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { stagger as staggerPreset } from "./presets";

const MotionBox = motion.create(Box);

export function StaggerContainer({ children, ...props }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <Box {...props}>{children}</Box>;
  }

  return (
    <MotionBox
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={staggerPreset.container}
      {...props}
    >
      {children}
    </MotionBox>
  );
}

export function StaggerItem({ children, ...props }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <Box {...props}>{children}</Box>;
  }

  return (
    <MotionBox variants={staggerPreset.item} {...props}>
      {children}
    </MotionBox>
  );
}
