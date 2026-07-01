import { View, Text, Button } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function Detalle() {
  const { nombre, edad } = useLocalSearchParams();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Pantalla Detalle
      </Text>

      <Text style={{ fontSize: 18 }}>
        Nombre: {nombre}
      </Text>

      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Edad: {edad}
      </Text>

      <Button
        title="Ir a Acerca De"
        onPress={() => router.push("/acercade")}
      />

      <View style={{ marginTop: 20 }}>
        <Button
          title="Volver"
          onPress={() => router.back()}
        />
      </View>
    </View>
  );
}