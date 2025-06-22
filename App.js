import React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlayerProvider } from './context/PlayerContext';
import RadioList from './screens/RadioList';
import RadioPlayer from './screens/RadioPlayer';
import EditarAdicionarRadio from './screens/EditarAdicionarRadio';

const Stack = createNativeStackNavigator();

export default function App() {
  const scheme = useColorScheme();
  return (
    <PlayerProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Início" component={RadioList} options={{ title: '📻 Rádios Portuguesas' }} />
          <Stack.Screen name="Reproduzir" component={RadioPlayer} />
          <Stack.Screen name="Adicionar" component={EditarAdicionarRadio} />
        </Stack.Navigator>
      </NavigationContainer>
    </PlayerProvider>
  );
}
