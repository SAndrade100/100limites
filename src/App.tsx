import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Importar telas (vou criar depois)
import HomeScreen from './screens/HomeScreen';
import TreinosScreen from './screens/TreinosScreen';
import PlanosScreen from './screens/PlanosScreen';
import PlanoDetailsScreen from './screens/PlanoDetailsScreen';
import TreinoAtivoScreen from './screens/TreinoAtivoScreen';
import HistoricoScreen from './screens/HistoricoScreen';
import PerfilScreen from './screens/PerfilScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#87084E',
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Treinos" 
          component={TreinosScreen}
          options={{ title: 'Meus Treinos' }}
        />
        <Stack.Screen 
          name="Planos" 
          component={PlanosScreen}
          options={{ title: 'Meus Planos' }}
        />
        <Stack.Screen 
          name="PlanoDetails" 
          component={PlanoDetailsScreen}
          options={{ title: 'Detalhes do Plano' }}
        />
        <Stack.Screen 
          name="TreinoAtivo" 
          component={TreinoAtivoScreen}
          options={{ 
            title: 'Treino em Andamento',
            presentation: 'fullScreenModal'
          }}
        />
        <Stack.Screen 
          name="Historico" 
          component={HistoricoScreen}
          options={{ title: 'Histórico' }}
        />
        <Stack.Screen 
          name="Perfil" 
          component={PerfilScreen}
          options={{ title: 'Perfil' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
