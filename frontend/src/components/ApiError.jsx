import { Alert } from "@chakra-ui/react";

const isLocalDev =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

export default function ApiError({ message }) {
  const hint = isLocalDev
    ? "Make sure Django is running on port 8000."
    : "Check that VITE_API_URL points to your live API and that content exists in Django admin.";

  return (
    <Alert.Root status="error" borderRadius="lg">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>Something went wrong</Alert.Title>
        <Alert.Description>
          {message}. {hint}
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );
}
