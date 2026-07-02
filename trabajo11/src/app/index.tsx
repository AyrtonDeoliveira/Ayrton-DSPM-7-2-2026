import React, { useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Producto = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
};

export default function Index() {
  const [productos, setProductos] = useState<Producto[]>([
    {
      id: "1",
      nombre: "Camiseta",
      descripcion: "Camiseta negra de algodón",
      precio: 20,
    },
    {
      id: "2",
      nombre: "Pantalón",
      descripcion: "Pantalón jean azul",
      precio: 35,
    },
    {
      id: "3",
      nombre: "Zapatos",
      descripcion: "Zapatos deportivos",
      precio: 50,
    },
  ]);

  const [productoEditando, setProductoEditando] = useState<Producto | null>(null);
  const [nombre, setNombre] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [precio, setPrecio] = useState<string>("");

  const eliminarProducto = (id: string): void => {
    setProductos((prevProductos) =>
      prevProductos.filter((producto) => producto.id !== id)
    );
  };

  const confirmarEliminacion = (id: string): void => {
    Alert.alert("Confirmar", "¿Deseas eliminar este producto?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => eliminarProducto(id),
      },
    ]);
  };

  const editarProducto = (producto: Producto): void => {
    setProductoEditando(producto);
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(producto.precio.toString());
  };

  const cancelarEdicion = (): void => {
    setProductoEditando(null);
    setNombre("");
    setDescripcion("");
    setPrecio("");
  };

  const guardarCambios = (): void => {
    if (productoEditando === null) return;

    if (
      nombre.trim() === "" ||
      descripcion.trim() === "" ||
      precio.trim() === ""
    ) {
      Alert.alert("Error", "Completá todos los campos.");
      return;
    }

    const precioNumerico = Number(precio);

    if (Number.isNaN(precioNumerico)) {
      Alert.alert("Error", "El precio debe ser un número.");
      return;
    }

    setProductos((prevProductos) =>
      prevProductos.map((producto) =>
        producto.id === productoEditando.id
          ? {
              ...producto,
              nombre: nombre,
              descripcion: descripcion,
              precio: precioNumerico,
            }
          : producto
      )
    );

    cancelarEdicion();
  };

  const renderItem: ListRenderItem<Producto> = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text>Descripción: {item.descripcion}</Text>
        <Text>Precio: ${item.precio}</Text>

        <View style={styles.botones}>
          <Button title="Editar" onPress={() => editarProducto(item)} />

          <View style={styles.separador} />

          <Button
            title="Eliminar"
            color="red"
            onPress={() => confirmarEliminacion(item.id)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>App CRUD Productos</Text>

      {productoEditando !== null && (
        <View style={styles.formulario}>
          <Text style={styles.subtitulo}>Editar producto</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />

          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={descripcion}
            onChangeText={setDescripcion}
          />

          <TextInput
            style={styles.input}
            placeholder="Precio"
            value={precio}
            onChangeText={setPrecio}
            keyboardType="numeric"
          />

          <View style={styles.botones}>
            <Button title="Guardar" onPress={guardarCambios} />

            <View style={styles.separador} />

            <Button title="Cancelar" color="gray" onPress={cancelarEdicion} />
          </View>
        </View>
      )}

      <FlatList<Producto>
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  formulario: {
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#999999",
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  card: {
    padding: 15,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
  },
  botones: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  separador: {
    width: 10,
  },
});