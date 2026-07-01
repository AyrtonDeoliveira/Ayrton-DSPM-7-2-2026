import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function AcercaDe() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Acerca De
      </Text>

      <Text style={{ marginBottom: 20 }}>
        Ejemplo de navegación usando Expo Router.
      </Text>

      <Button
        title="Volver al Inicio"
        onPress={() => router.push("/")}
      />
    </View>
  );
}