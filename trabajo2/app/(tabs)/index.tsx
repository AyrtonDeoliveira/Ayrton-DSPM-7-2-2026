import { View, Text, Image, Button } from 'react-native';

function Card(props: any) {
  return (
    <View
      style={{
        borderWidth: 1,
        padding: 15,
        margin: 10,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          marginBottom: 10,
        }}
      >
        {props.titulo}
      </Text>

      <Image
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
        style={{
          width: 50,
          height: 50,
          marginBottom: 10,
        }}
      />

      <Text>{props.children}</Text>

      <Button
        title="Ver más"
        onPress={() => alert('Botón presionado')}
      />
    </View>
  );
}

export default function Home() {
  return (
    <View>
      <Card titulo="React Native">
        Aplicaciones móviles usando JavaScript
      </Card>

      <Card titulo="Expo Router">
        Navegación moderna basada en archivos
      </Card>

      <Card titulo="Componentes">
        Uso de View, Text, Image y Button
      </Card>
    </View>
  );
}