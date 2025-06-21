// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RadioList from './screens/RadioList';
import RadioPlayer from './screens/RadioPlayer';
import Adicionar from './screens/EditarAdicionarRadio';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lista">
        <Stack.Screen name="Lista" component={RadioList} options={{ title: "📻 Rádios Portuguesas" }} />
        <Stack.Screen name="Rádio" component={RadioPlayer} />
        <Stack.Screen name="Adicionar" component={Adicionar} options={{ title: 'Nova Rádio' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
