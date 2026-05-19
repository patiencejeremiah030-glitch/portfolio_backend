import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import api from "../api";
import GradientText from "../components/GradientText";
import FadeIn from "../components/motion/FadeIn";
import useAppTheme from "../hooks/useAppTheme";

const MotionFlex = motion.create(Flex);
let messageId = 1;

const QUICK_PROMPTS = [
  "What projects have you built?",
  "List your core skills",
  "Tell me about your experience",
  "How can I contact you?",
];

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi! I'm Audrey's portfolio AI. Ask me about skills, projects, experience, or how to get in touch.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const { isDark, cardBorder, textPrimary, textSecondary, glassBorder } = useAppTheme();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [
      ...prev,
      { id: `msg-${++messageId}`, role: "user", text: trimmed },
    ]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/chat/", { message: trimmed });

      if (res.data?.error) {
        setError(res.data.error);
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${++messageId}`,
            role: "assistant",
            text: "Sorry, I couldn't respond. Try again.",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { id: `msg-${++messageId}`, role: "assistant", text: res.data.reply },
        ]);
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Connection failed. Start Django and check GROQ_API_KEY."
      );
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${++messageId}`,
          role: "assistant",
          text: "Couldn't reach the server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <Box position="relative" overflow="hidden">
      <Box
        position="absolute"
        top="-80px"
        left="50%"
        transform="translateX(-50%)"
        w="320px"
        h="320px"
        borderRadius="full"
        bg={isDark ? "rgba(99,102,241,0.2)" : "rgba(59,130,246,0.15)"}
        filter="blur(80px)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="10%"
        right="-40px"
        w="200px"
        h="200px"
        borderRadius="full"
        bg={isDark ? "rgba(56,189,248,0.12)" : "rgba(45,212,191,0.12)"}
        filter="blur(60px)"
        pointerEvents="none"
      />

      <Container maxW="container.xl" px={{ base: 4, md: 8 }} position="relative" zIndex={1}>
        <FadeIn asView={false} direction="down" y={-16} duration={0.5}>
          <VStack gap={4} mb={6} textAlign="center">
            <Text
              as="h1"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="800"
              fontFamily="heading"
              letterSpacing="-0.03em"
              color={textPrimary}
            >
              Talk to my <GradientText>AI</GradientText>
            </Text>
          </VStack>
        </FadeIn>

        <Flex justify="center" pb={6} px={{ base: 0, sm: 2 }}>
          <FadeIn
            asView={false}
            direction="scale"
            delay={0.1}
            duration={0.6}
            w="100%"
            maxW={{ base: "100%", sm: "440px", md: "480px" }}
            minW={0}
            mx="auto"
          >
          <Box
            position="relative"
            w="100%"
          >
            <Box
              position="absolute"
              inset="-1px"
              borderRadius={{ base: "xl", md: "2xl" }}
              bgGradient="to-br"
              gradientFrom="brand.500"
              gradientVia="blue.400"
              gradientTo="cyan.400"
              opacity={0.7}
            />

            <Box
              position="relative"
              borderRadius={{ base: "xl", md: "2xl" }}
              overflow="hidden"
              display="flex"
              flexDirection="column"
              h={{ base: "420px", md: "480px" }}
              maxH={{
                base: "min(420px, calc(100dvh - 220px))",
                md: "min(480px, calc(100dvh - 200px))",
              }}
              bg={isDark ? "rgba(15,23,42,0.95)" : "rgba(255,255,255,0.95)"}
              backdropFilter="blur(16px)"
              shadow={isDark ? "0 24px 60px rgba(0,0,0,0.5)" : "0 24px 50px rgba(59,130,246,0.15)"}
            >
              <HStack
                px={{ base: 4, md: 5 }}
                py={3}
                borderBottomWidth="1px"
                borderColor={cardBorder}
                bg={
                  isDark
                    ? "linear-gradient(90deg, rgba(99,102,241,0.15), rgba(56,189,248,0.08))"
                    : "linear-gradient(90deg, #eef2ff, #ecfeff)"
                }
                gap={3}
              >
                <Box
                  w="36px"
                  h="36px"
                  borderRadius="full"
                  bgGradient="to-br"
                  gradientFrom="brand.500"
                  gradientTo="cyan.400"
                  color="white"
                  fontSize="xs"
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  css={{ animation: "aiPulse 2.5s ease-in-out infinite" }}
                >
                  AI
                </Box>
                <Box flex={1} minW={0} textAlign="left">
                  <Text fontWeight="bold" fontSize="sm" color={textPrimary}>
                    Portfolio Assistant
                  </Text>
                  <HStack gap={1.5} mt={0.5}>
                    <Box w={2} h={2} borderRadius="full" bg="green.400" />
                    <Text fontSize="xs" color={textSecondary}>
                      Online · Ready to help
                    </Text>
                  </HStack>
                </Box>
              </HStack>

              <VStack
                flex={1}
                align="stretch"
                gap={3}
                px={{ base: 3, md: 4 }}
                py={{ base: 3, md: 4 }}
                overflowY="auto"
                overflowX="hidden"
                bg={
                  isDark
                    ? "radial-gradient(ellipse at top, rgba(99,102,241,0.06), transparent 60%)"
                    : "radial-gradient(ellipse at top, rgba(219,234,254,0.5), transparent 60%)"
                }
              >
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <MessageBubble
                      key={msg.id}
                      msg={msg}
                      isDark={isDark}
                      cardBorder={cardBorder}
                    />
                  ))}
                </AnimatePresence>
                <AnimatePresence>
                  {loading && (
                    <TypingIndicator
                      key="typing"
                      isDark={isDark}
                      cardBorder={cardBorder}
                    />
                  )}
                </AnimatePresence>
                <div ref={bottomRef} />
              </VStack>

              {messages.length <= 1 && !loading && (
                <Box px={{ base: 3, md: 4 }} pb={2}>
                  <SimpleGrid columns={2} gap={2}>
                    {QUICK_PROMPTS.map((prompt) => (
                      <Button
                        key={prompt}
                        size="xs"
                        variant="outline"
                        borderRadius="lg"
                        borderColor={glassBorder}
                        color={textSecondary}
                        fontWeight="medium"
                        h="auto"
                        py={2}
                        px={2}
                        whiteSpace="normal"
                        textAlign="left"
                        lineHeight="short"
                        onClick={() => sendMessage(prompt)}
                        _hover={{
                          borderColor: "brand.400",
                          color: "brand.500",
                          bg: isDark ? "whiteAlpha.50" : "brand.50",
                        }}
                      >
                        {prompt}
                      </Button>
                    ))}
                  </SimpleGrid>
                </Box>
              )}

              <Box
                as="form"
                onSubmit={handleSubmit}
                px={{ base: 3, md: 4 }}
                py={{ base: 3, md: 4 }}
                borderTopWidth="1px"
                borderColor={cardBorder}
                bg={isDark ? "rgba(15,23,42,0.9)" : "white"}
              >
                <HStack gap={2} w="full">
                  <Input
                    placeholder="Ask anything about this portfolio…"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    size={{ base: "sm", md: "md" }}
                    borderRadius="full"
                    fontSize="sm"
                    bg={isDark ? "gray.900" : "gray.50"}
                    borderColor={glassBorder}
                    _focusVisible={{
                      borderColor: "brand.400",
                      shadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                    }}
                    disabled={loading}
                    flex={1}
                    minW={0}
                    h={{ base: "38px", md: "42px" }}
                  />
                  <Button
                    type="submit"
                    colorPalette="brand"
                    size={{ base: "sm", md: "md" }}
                    borderRadius="full"
                    px={{ base: 5, md: 6 }}
                    h={{ base: "38px", md: "42px" }}
                    flexShrink={0}
                    bgGradient="to-r"
                    gradientFrom="brand.600"
                    gradientTo="blue.500"
                    loading={loading}
                    disabled={!input.trim()}
                    shadow="md"
                  >
                    Send
                  </Button>
                </HStack>
              </Box>
            </Box>
          </Box>
          </FadeIn>
        </Flex>

        {error && (
          <Text
            mt={2}
            fontSize="xs"
            color="red.500"
            textAlign="center"
            maxW={{ base: "100%", md: "480px" }}
            mx="auto"
            px={2}
          >
            {error}
          </Text>
        )}
      </Container>
    </Box>
  );
}

function TypingIndicator({ isDark, cardBorder }) {
  const reduceMotion = useReducedMotion();

  return (
    <MotionFlex
      justify="flex-start"
      gap={2}
      align="flex-end"
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <AvatarCircle isAssistant />
      <Box
        px={4}
        py={2.5}
        borderRadius="xl"
        borderBottomLeftRadius="sm"
        bg={isDark ? "gray.800" : "white"}
        borderWidth="1px"
        borderColor={cardBorder}
      >
        <HStack gap={1}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              w="6px"
              h="6px"
              borderRadius="full"
              bg="brand.400"
              css={{
                animation: "typingBounce 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </HStack>
      </Box>
    </MotionFlex>
  );
}

function AvatarCircle({ isAssistant }) {
  return (
    <Box
      w="28px"
      h="28px"
      flexShrink={0}
      borderRadius="full"
      bg={
        isAssistant
          ? "linear-gradient(135deg, #6366f1, #22d3ee)"
          : "linear-gradient(135deg, #2563eb, #4f46e5)"
      }
      color="white"
      fontSize="10px"
      fontWeight="bold"
      display="flex"
      alignItems="center"
      justifyContent="center"
      shadow="sm"
    >
      {isAssistant ? "AI" : "Y"}
    </Box>
  );
}

function MessageBubble({ msg, isDark, cardBorder }) {
  const isUser = msg.role === "user";
  const reduceMotion = useReducedMotion();

  return (
    <MotionFlex
      layout={!reduceMotion}
      justify={isUser ? "flex-end" : "flex-start"}
      gap={2}
      align="flex-end"
      w="full"
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 12, x: isUser ? 12 : -12, scale: 0.98 }
      }
      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {!isUser && <AvatarCircle isAssistant />}
      <Box maxW={{ base: "88%", md: "82%" }}>
        <Text
          fontSize="10px"
          fontWeight="semibold"
          color={isUser ? "blue.400" : "brand.400"}
          mb={1}
          textAlign={isUser ? "right" : "left"}
          textTransform="uppercase"
          letterSpacing="wider"
        >
          {isUser ? "You" : "Assistant"}
        </Text>
        <Box
          px={3.5}
          py={2.5}
          borderRadius="xl"
          borderBottomRightRadius={isUser ? "sm" : "xl"}
          borderBottomLeftRadius={isUser ? "xl" : "sm"}
          bg={
            isUser
              ? "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)"
              : isDark
                ? "rgba(30,41,59,0.9)"
                : "white"
          }
          color={isUser ? "white" : "inherit"}
          borderWidth={isUser ? 0 : "1px"}
          borderColor={cardBorder}
          shadow={isUser ? "md" : "sm"}
        >
          <Text fontSize="sm" lineHeight="1.55" whiteSpace="pre-wrap">
            {msg.text}
          </Text>
        </Box>
      </Box>
      {isUser && <AvatarCircle />}
    </MotionFlex>
  );
}
