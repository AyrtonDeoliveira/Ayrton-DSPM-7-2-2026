import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Inicio",
        }}
      />

      <Stack.Screen
        name="detalle"
        options={{
          title: "Información del Usuario",
        }}
      />

      <Stack.Screen
        name="acercade"
        options={{
          title: "Acerca de",
        }}
      />
    </Stack>
  );
}