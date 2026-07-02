import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Usuario = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const validarFormulario = () => {
    if (!email || !password) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return false;
    }

    const formatoEmail = /\S+@\S+\.\S+/;

    if (!formatoEmail.test(email)) {
      Alert.alert("Error", "Email inválido");
      return false;
    }

    return true;
  };

  const iniciarSesion = async () => {
    if (!validarFormulario()) return;

    const usuarioGuardado = await AsyncStorage.getItem(
      "usuarioRegistrado"
    );

    if (!usuarioGuardado) {
      Alert.alert("Error", "No hay usuarios registrados");
      return;
    }

    const usuario: Usuario = JSON.parse(usuarioGuardado);

    if (
      usuario.email === email &&
      usuario.password === password
    ) {
      await AsyncStorage.setItem(
        "usuarioActivo",
        JSON.stringify(usuario)
      );

      Alert.alert("Éxito", "Inicio de sesión correcto");

      router.replace("/");
    } else {
      Alert.alert("Error", "Credenciales incorrectas");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button title="Ingresar" onPress={iniciarSesion} />

      <View style={styles.space} />

      <Button
        title="Crear cuenta"
        onPress={() => router.push("/register")}
      />
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  space: {
    height: 15,
  },
});