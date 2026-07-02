import { View, Text, Button, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useTema } from "../context/TemaContext";

export default function Index() {
  const { usuario, login, logout } = useAuth();
  const { tema, alternarTema } = useTema();

  const esClaro = tema === "claro";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: esClaro ? "#fff" : "#222" },
      ]}
    >
      {!usuario ? (
        <>
          <Text style={[styles.texto, { color: esClaro ? "#000" : "#fff" }]}>
            Pantalla de Login
          </Text>

          <Button title="Iniciar sesión" onPress={login} />
        </>
      ) : (
        <>
          <Text style={[styles.texto, { color: esClaro ? "#000" : "#fff" }]}>
            Bienvenido, {usuario.nombre}
          </Text>

          <Text style={[styles.texto, { color: esClaro ? "#000" : "#fff" }]}>
            Tema actual: {tema}
          </Text>

          <Button title="Cambiar tema" onPress={alternarTema} />

          <View style={{ marginTop: 15 }}>
            <Button title="Cerrar sesión" onPress={logout} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  texto: {
    fontSize: 22,
    fontWeight: "bold",
  },
});