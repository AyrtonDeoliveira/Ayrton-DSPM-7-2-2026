import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';

import useProductos from '../../hook/useProductos';

export default function App() {
  const { productos, guardarProductos } = useProductos();

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [editando, setEditando] = useState<string | null>(null);

  function guardar() {
    if (nombre === '' || precio === '') {
      Alert.alert(
        'Error',
        'Todos los campos son obligatorios'
      );
      return;
    }

    if (isNaN(Number(precio))) {
      Alert.alert(
        'Error',
        'El precio debe ser numérico'
      );
      return;
    }

    if (editando) {
      const lista = productos.map((p) =>
        p.id === editando
          ? { ...p, nombre, precio }
          : p
      );

      guardarProductos(lista);
      setEditando(null);
    } else {
      const nuevo = {
        id: Date.now().toString(),
        nombre,
        precio,
      };

      guardarProductos([...productos, nuevo]);
    }

    setNombre('');
    setPrecio('');
  }

  function editar(item: any) {
    setNombre(item.nombre);
    setPrecio(item.precio);
    setEditando(item.id);
  }

  function eliminar(id: string) {
    Alert.alert(
      'Eliminar',
      '¿Deseás eliminar este producto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            guardarProductos(
              productos.filter((p) => p.id !== id)
            );
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        CRUD Productos
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={precio}
        keyboardType="numeric"
        onChangeText={setPrecio}
      />

      <Button
        title={
          editando
            ? 'Actualizar producto'
            : 'Agregar producto'
        }
        onPress={guardar}
      />

      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>
              {item.nombre}
            </Text>

            <Text>
              ${item.precio}
            </Text>

            <View style={styles.botones}>
              <Button
                title="Editar"
                onPress={() => editar(item)}
              />

              <Button
                title="Eliminar"
                color="red"
                onPress={() => eliminar(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
  },

  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});