import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Usuario = {
  email: string;
  password: string;
};

export default function HomeScreen() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarSesion = async () => {
      const sesion = await AsyncStorage.getItem("usuarioActivo");

      if (sesion) {
        setUsuario(JSON.parse(sesion));
      }

      setCargando(false);
    };

    cargarSesion();
  }, []);

  const cerrarSesion = async () => {
    await AsyncStorage.removeItem("usuarioActivo");
    setUsuario(null);
  };

  if (cargando) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>AppAuth</Text>

        <Button
          title="Iniciar sesión"
          onPress={() => router.push("/login")}
        />

        <View style={styles.space} />

        <Button
          title="Registrarse"
          onPress={() => router.push("/register")}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla principal</Text>

      <Text style={styles.text}>
        Bienvenido, {usuario.email}
      </Text>

      <View style={styles.space} />

      <Button title="Cerrar sesión" onPress={cerrarSesion} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
  },
  space: {
    height: 15,
  },
});