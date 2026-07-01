import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function Inicio() {
  const nombre = "Ayrton";
  const edad = 18;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Pantalla de Inicio
      </Text>

      <Button
        title="Ir a Detalle"
        onPress={() =>
          router.push({
            pathname: "/detalle",
            params: {
              nombre,
              edad,
            },
          })
        }
      />

      <View style={{ marginTop: 20 }}>
        <Button
          title="Ir a Acerca De"
          onPress={() => router.push("/acercade")}
        />
      </View>
    </View>
  );
}