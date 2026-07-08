import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Producto {
  id: string;
  nombre: string;
  precio: string;
}

export default function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  async function cargarProductos() {
    const datos = await AsyncStorage.getItem('productos');

    if (datos) {
      setProductos(JSON.parse(datos));
    }
  }

  async function guardarProductos(lista: Producto[]) {
    setProductos(lista);
    await AsyncStorage.setItem(
      'productos',
      JSON.stringify(lista)
    );
  }

  return {
    productos,
    guardarProductos,
  };
}