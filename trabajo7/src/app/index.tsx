import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Pantalla({ titulo }: { titulo: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{titulo}</Text>
    </View>
  );
}

function Login({ onLogin }: { onLogin: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>
      <Text style={styles.texto}>Presioná el botón para iniciar sesión.</Text>
      <Button title="Iniciar sesión" onPress={onLogin} />
    </View>
  );
}

function Inicio() {
  return <Pantalla titulo="Pantalla de Inicio" />;
}

function Perfil() {
  return <Pantalla titulo="Perfil del Usuario" />;
}

function Configuracion() {
  return <Pantalla titulo="Configuración" />;
}

function Acerca() {
  return <Pantalla titulo="Acerca de la aplicación" />;
}

function Salir({ onLogout }: { onLogout: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Salir</Text>
      <Button title="Cerrar sesión" onPress={onLogout} />
    </View>
  );
}

function TabsPrincipales() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: '#6200ee' },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Inicio') iconName = 'home';
          if (route.name === 'Perfil') iconName = 'person';
          if (route.name === 'Configuración') iconName = 'settings';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={Inicio} />
      <Tab.Screen name="Perfil" component={Perfil} />
      <Tab.Screen name="Configuración" component={Configuracion} />
    </Tab.Navigator>
  );
}

function DrawerPrincipal({ onLogout }: { onLogout: () => void }) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#6200ee' },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
    >
      <Drawer.Screen
        name="Principal"
        component={TabsPrincipales}
        options={{ title: 'App Navegación Avanzada' }}
      />

      <Drawer.Screen name="Acerca de" component={Acerca} />

      <Drawer.Screen name="Salir">
        {() => <Salir onLogout={onLogout} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default function App() {
  const [autenticado, setAutenticado] = useState(false);

  if (!autenticado) {
    return <Login onLogin={() => setAutenticado(true)} />;
  }

  return <DrawerPrincipal onLogout={() => setAutenticado(false)} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  texto: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
  },
});