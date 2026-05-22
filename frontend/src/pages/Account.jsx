import { useEffect } from "react";
import {
  Badge,
  Button,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthFormLayout from "../components/AuthFormLayout";
import PageLoader from "../components/PageLoader";
import { useAuth } from "../context/AuthContext";
import useAppTheme from "../hooks/useAppTheme";

export default function Account() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { textPrimary, textSecondary } = useAppTheme();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) return <PageLoader label="Loading account…" />;
  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <AuthFormLayout title="Your account" subtitle="You are signed in as a portfolio visitor.">
      <VStack align="stretch" gap={5}>
        <Stack gap={1}>
          <Text fontSize="sm" color={textSecondary}>
            Username
          </Text>
          <Heading size="md" color={textPrimary} fontFamily="heading">
            {user.username}
          </Heading>
        </Stack>
        <Stack gap={1}>
          <Text fontSize="sm" color={textSecondary}>
            Email
          </Text>
          <Text fontWeight="medium" color={textPrimary}>
            {user.email || "—"}
          </Text>
        </Stack>
        <Badge alignSelf="start" colorPalette="green" variant="subtle" borderRadius="full" px={3}>
          Active session
        </Badge>
        <Button colorPalette="brand" size="lg" borderRadius="xl" onClick={handleLogout}>
          Log out
        </Button>
        <Button asChild variant="outline" colorPalette="brand" borderRadius="xl">
          <RouterLink to="/">Back to home</RouterLink>
        </Button>
      </VStack>
    </AuthFormLayout>
  );
}
