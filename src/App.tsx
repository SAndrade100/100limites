import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { HistoryProvider, UserProvider, WorkoutProvider } from './contexts';
import AddExerciseScreen from './screens/AddExerciseScreen';
import CreateWorkoutScreen from './screens/CreateWorkoutScreen';
import HistoricoScreen from './screens/HistoricoScreen';
import HomeScreen from './screens/HomeScreen';
// PerfilScreen removed - replaced by CRUD screens
import AvaliacaoAntropometricaScreen from './screens/AvaliacaoAntropometricaScreen';
import ExercisesScreen from './screens/ExercisesScreen';
import PlanoDetailsScreen from './screens/PlanoDetailsScreen';
import PlanosCrudScreen from './screens/PlanosCrudScreen';
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
          component={PlanosCrudScreen}
          options={{ title: 'Meus Planos' }}
        />
        <Stack.Screen
          name="Exercises"
          component={ExercisesScreen}
          options={{ title: 'Exercícios' }}
        />
        <Stack.Screen
          name="CreateWorkout"
          component={CreateWorkoutScreen}
          options={{ title: 'Criar Plano' }}
        />
        <Stack.Screen
          name="AddExercise"
          component={AddExerciseScreen}
          options={{ title: 'Adicionar Exercício' }}
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
          name="Avaliacao"
          component={AvaliacaoAntropometricaScreen}
          options={{ title: 'Avaliação' }}
        />
        {/* Perfil removed - profile functionality replaced by user context or separate screens if needed */}
      </Stack.Navigator>
    </NavigationContainer>
        </HistoryProvider>
      </WorkoutProvider>
    </UserProvider>
  );
}
