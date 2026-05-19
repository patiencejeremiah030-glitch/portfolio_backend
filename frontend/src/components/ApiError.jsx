import { Alert } from "@chakra-ui/react";

export default function ApiError({ message }) {
  return (
    <Alert.Root status="error" borderRadius="lg">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>Something went wrong</Alert.Title>
        <Alert.Description>
          {message}. Make sure Django is running on port 8000.
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );
}
