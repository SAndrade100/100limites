import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { HistoryProvider, UserProvider, WorkoutProvider } from './contexts';
import HistoricoScreen from './screens/HistoricoScreen';
import HomeScreen from './screens/HomeScreen';
import PerfilScreen from './screens/PerfilScreen';
import PlanoDetailsScreen from './screens/PlanoDetailsScreen';
import PlanosScreen from './screens/PlanosScreen';
import TreinoAtivoScreen from './screens/TreinoAtivoScreen';
import TreinosScreen from './screens/TreinosScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <WorkoutProvider>
        <HistoryProvider>
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
        </HistoryProvider>
      </WorkoutProvider>
    </UserProvider>
  );
}
