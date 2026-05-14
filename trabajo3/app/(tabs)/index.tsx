import { View, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function Home() {
  const [activo, setActivo] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.cajaRoja}></View>

      <Pressable
        onPress={() => setActivo(!activo)}
        style={[
          styles.caja,
          activo ? styles.cajaVerde : styles.cajaAzul,
        ]}
      ></Pressable>

      <View style={styles.cajaAmarilla}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  caja: {
    width: 100,
    height: 100,
  },

  cajaRoja: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },

  cajaAzul: {
    backgroundColor: 'blue',
  },

  cajaVerde: {
    backgroundColor: 'green',
  },

  cajaAmarilla: {
    width: 100,
    height: 100,
    backgroundColor: 'yellow',
  },
});