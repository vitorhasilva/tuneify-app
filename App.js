import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlayerProvider } from './context/PlayerContext';
import RadioList from './screens/RadioList';
import RadioPlayer from './screens/RadioPlayer';
import EditarAdicionarRadio from './screens/EditarAdicionarRadio';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PlayerProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Início" component={RadioList} />
          <Stack.Screen name="Reproduzir" component={RadioPlayer} />
          <Stack.Screen name="Adicionar" component={EditarAdicionarRadio} />
        </Stack.Navigator>
      </NavigationContainer>
    </PlayerProvider>
  );
}