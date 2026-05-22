import { useState } from "react";
import {
  Button,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthFormLayout, { AuthField } from "../components/AuthFormLayout";
import { useAuth } from "../context/AuthContext";
import useAppTheme from "../hooks/useAppTheme";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { textPrimary, glassBorder } = useAppTheme();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const inputFocus = {
    borderColor: "brand.400",
    shadow: "0 0 0 1px var(--chakra-colors-brand-400)",
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login(form.username.trim(), form.password);
      navigate("/account", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthFormLayout
      title="Welcome back"
      subtitle="Sign in with your username or email and password."
    >
      <Stack as="form" gap={5} onSubmit={handleSubmit}>
        <AuthField label="Username or email" textPrimary={textPrimary}>
          <Input
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            autoComplete="username"
            variant="outline"
            borderColor={glassBorder}
            _focusVisible={inputFocus}
          />
        </AuthField>
        <AuthField label="Password" textPrimary={textPrimary}>
          <Input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            variant="outline"
            borderColor={glassBorder}
            _focusVisible={inputFocus}
          />
        </AuthField>
        {error && (
          <Text fontSize="sm" color="red.500">
            {error}
          </Text>
        )}
        <Button
          type="submit"
          colorPalette="brand"
          size="lg"
          w="full"
          borderRadius="xl"
          loading={submitting}
        >
          Log in
        </Button>
        <Text fontSize="sm" textAlign="center" color="gray.500">
          No account?{" "}
          <Link asChild color="brand.500" fontWeight="semibold">
            <RouterLink to="/register">Create one</RouterLink>
          </Link>
        </Text>
      </Stack>
    </AuthFormLayout>
  );
}
