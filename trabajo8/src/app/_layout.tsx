import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { TemaProvider } from "../context/TemaContext";

export default function Layout() {
  return (
    <AuthProvider>
      <TemaProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </TemaProvider>
    </AuthProvider>
  );
}