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

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { textPrimary, glassBorder } = useAppTheme();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password_confirm: "",
  });
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
      await register({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        password_confirm: form.password_confirm,
      });
      navigate("/account", { replace: true });
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthFormLayout
      title="Create an account"
      subtitle="Create a free account to follow along on this portfolio."
    >
      <Stack as="form" gap={5} onSubmit={handleSubmit}>
        <AuthField label="Username" textPrimary={textPrimary}>
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
        <AuthField label="Email" textPrimary={textPrimary}>
          <Input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
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
            minLength={8}
            autoComplete="new-password"
            variant="outline"
            borderColor={glassBorder}
            _focusVisible={inputFocus}
          />
        </AuthField>
        <AuthField label="Confirm password" textPrimary={textPrimary}>
          <Input
            name="password_confirm"
            type="password"
            value={form.password_confirm}
            onChange={handleChange}
            required
            minLength={8}
            autoComplete="new-password"
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
          Sign up
        </Button>
        <Text fontSize="sm" textAlign="center" color="gray.500">
          Already have an account?{" "}
          <Link asChild color="brand.500" fontWeight="semibold">
            <RouterLink to="/login">Log in</RouterLink>
          </Link>
        </Text>
      </Stack>
    </AuthFormLayout>
  );
}
