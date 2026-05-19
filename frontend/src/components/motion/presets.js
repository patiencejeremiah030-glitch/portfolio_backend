/** Shared easing — smooth deceleration */
export const easeOut = [0.22, 1, 0.36, 1];

export const transition = {
  fast: { duration: 0.3, ease: easeOut },
  medium: { duration: 0.5, ease: easeOut },
  slow: { duration: 0.7, ease: easeOut },
};

export const stagger = {
  container: {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: easeOut },
    },
  },
};

export function fadeVariants(reduceMotion, { y = 24, x = 0, scale = 1 } = {}) {
  if (reduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };
  }
  return {
    hidden: { opacity: 0, y, x, scale },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: transition.medium,
    },
  };
}

export function pageVariants(reduceMotion) {
  if (reduceMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    };
  }
  return {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0, transition: transition.medium },
    exit: { opacity: 0, y: -10, transition: transition.fast },
  };
}
