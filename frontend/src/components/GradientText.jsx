import { Box } from "@chakra-ui/react";

export default function GradientText({ children, as = "span", ...props }) {
  return (
    <Box
      as={as}
      bgGradient="to-r"
      gradientFrom="brand.400"
      gradientVia="brand.500"
      gradientTo="cyan.400"
      bgClip="text"
      color="transparent"
      display="inline"
      {...props}
    >
      {children}
    </Box>
  );
}
