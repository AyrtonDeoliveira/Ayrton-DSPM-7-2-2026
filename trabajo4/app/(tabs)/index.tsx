import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

export default function Home() {
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Formulario</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresá tu nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Ingresá tu contraseña"
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry={true}
      />

      {nombre !== '' && contrasena !== '' && (
        <Text style={styles.mensaje}>
          Hola, {nombre}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
  },

  mensaje: {
    fontSize: 22,
    marginTop: 20,
    textAlign: 'center',
  },
});