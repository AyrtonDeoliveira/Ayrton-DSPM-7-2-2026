import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  categoria: string;
  imagen: string | null;
};

export default function AppProductos() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState<string | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const datos = await AsyncStorage.getItem("productos");
      if (datos) {
        setProductos(JSON.parse(datos));
      }
    } catch {
      Alert.alert("Error", "No se pudieron cargar los productos");
    }
  };

  const guardarEnStorage = async (nuevosProductos: Producto[]) => {
    try {
      await AsyncStorage.setItem("productos", JSON.stringify(nuevosProductos));
    } catch {
      Alert.alert("Error", "No se pudo guardar el producto");
    }
  };

  const seleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permiso.granted) {
      Alert.alert("Permiso necesario", "Necesitás permitir el acceso a la galería");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagen(resultado.assets[0].uri);
    }
  };

  const tomarFoto = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();

    if (!permiso.granted) {
      Alert.alert("Permiso necesario", "Necesitás permitir el acceso a la cámara");
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagen(resultado.assets[0].uri);
    }
  };

  const validarFormulario = () => {
    if (!nombre.trim()) {
      Alert.alert("Error", "El nombre es obligatorio");
      return false;
    }

    if (!descripcion.trim()) {
      Alert.alert("Error", "La descripción es obligatoria");
      return false;
    }

    if (!precio.trim()) {
      Alert.alert("Error", "El precio es obligatorio");
      return false;
    }

    if (isNaN(Number(precio)) || Number(precio) <= 0) {
      Alert.alert("Error", "El precio debe ser un número mayor a 0");
      return false;
    }

    if (!categoria.trim()) {
      Alert.alert("Error", "La categoría es obligatoria");
      return false;
    }

    if (!imagen) {
      Alert.alert("Error", "Seleccioná o tomá una imagen del producto");
      return false;
    }

    return true;
  };

  const guardarProducto = async () => {
    if (!validarFormulario()) return;

    const nuevoProducto: Producto = {
      id: Date.now(),
      nombre,
      descripcion,
      precio,
      categoria,
      imagen,
    };

    const nuevosProductos = [...productos, nuevoProducto];

    setProductos(nuevosProductos);
    await guardarEnStorage(nuevosProductos);

    Alert.alert("Producto creado", "El producto se guardó correctamente");

    setNombre("");
    setDescripcion("");
    setPrecio("");
    setCategoria("");
    setImagen(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Crear Producto</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descripción del producto"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />

      <Text style={styles.label}>Precio</Text>
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Categoría</Text>
      <TextInput
        style={styles.input}
        placeholder="Categoría"
        value={categoria}
        onChangeText={setCategoria}
      />

      <View style={styles.botonesImagen}>
        <TouchableOpacity style={styles.botonSecundario} onPress={seleccionarImagen}>
          <Text style={styles.textoBoton}>Elegir imagen</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonSecundario} onPress={tomarFoto}>
          <Text style={styles.textoBoton}>Tomar foto</Text>
        </TouchableOpacity>
      </View>

      {imagen && (
        <Image source={{ uri: imagen }} style={styles.imagenPreview} />
      )}

      <TouchableOpacity style={styles.botonGuardar} onPress={guardarProducto}>
        <Text style={styles.textoBoton}>Guardar producto</Text>
      </TouchableOpacity>

      <Text style={styles.subtitulo}>Productos guardados</Text>

      {productos.map((producto) => (
        <View key={producto.id} style={styles.card}>
          {producto.imagen && (
            <Image source={{ uri: producto.imagen }} style={styles.imagenProducto} />
          )}
          <Text style={styles.nombreProducto}>{producto.nombre}</Text>
          <Text>{producto.descripcion}</Text>
          <Text>Precio: ${producto.precio}</Text>
          <Text>Categoría: {producto.categoria}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
  },
  botonesImagen: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },
  botonSecundario: {
    flex: 1,
    backgroundColor: "#555",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  botonGuardar: {
    backgroundColor: "#1f6feb",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
  },
  imagenPreview: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginTop: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  imagenProducto: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  nombreProducto: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});