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

export default function RegisterScreen() {
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

    if (password.length < 4) {
      Alert.alert(
        "Error",
        "La contraseña debe tener al menos 4 caracteres"
      );
      return false;
    }

    return true;
  };

  const registrar = async () => {
    if (!validarFormulario()) return;

    const usuario: Usuario = {
      email,
      password,
    };

    await AsyncStorage.setItem(
      "usuarioRegistrado",
      JSON.stringify(usuario)
    );

    await AsyncStorage.setItem(
      "usuarioActivo",
      JSON.stringify(usuario)
    );

    Alert.alert("Éxito", "Usuario registrado");

    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

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

      <Button title="Registrarse" onPress={registrar} />

      <View style={styles.space} />

      <Button
        title="Ya tengo cuenta"
        onPress={() => router.push("/login")}
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