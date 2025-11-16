import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Plan, Workout } from '../types';

interface WorkoutContextData {
  workouts: Workout[];
  plans: Plan[];
  loading: boolean;
  addWorkout: (workout: Workout) => Promise<void>;
  updateWorkout: (id: string, workout: Partial<Workout>) => Promise<void>;
  deleteWorkout: (id: string) => Promise<void>;
  addPlan: (plan: Plan) => Promise<void>;
  updatePlan: (id: string, plan: Partial<Plan>) => Promise<void>;
  deletePlan: (id: string) => Promise<void>;
  getPlanById: (id: string) => Plan | undefined;
}

const WorkoutContext = createContext<WorkoutContextData>({} as WorkoutContextData);

const STORAGE_KEYS = {
  WORKOUTS: '@100limites:workouts',
  PLANS: '@100limites:plans',
};

// Dados iniciais
const initialWorkouts: Workout[] = [
  {
    id: 'p1',
    title: 'Treino A — Pernas',
    items: ['Agachamento 4x10', 'Leg press 3x12', 'Stiff 3x10'],
  },
  {
    id: 'p2',
    title: 'Treino B — Peito / Tríceps',
    items: ['Supino 4x8', 'Cross-over 3x12', 'Tríceps 3x10'],
  },
  {
    id: 'p3',
    title: 'Treino C — Costas / Bíceps',
    items: ['Puxada 4x10', 'Remada 3x12', 'Rosca 3x10'],
  },
];

const initialPlans: Plan[] = [
  {
    id: 'p1',
    name: 'Treino A — Pernas',
    description: 'Foco em membros inferiores e glúteos',
    days: ['Segunda', 'Quinta'],
    exercises: [
      { name: 'Agachamento Livre', sets: '4x10', rest: '90s', notes: 'Descer até paralelo ao chão' },
      { name: 'Leg Press 45°', sets: '3x12', rest: '60s', notes: 'Pés na largura dos ombros' },
      { name: 'Stiff', sets: '3x10', rest: '60s', notes: 'Manter as costas retas' },
      { name: 'Cadeira Extensora', sets: '3x12', rest: '45s', notes: 'Extensão completa' },
    ],
    active: true,
  },
  {
    id: 'p2',
    name: 'Treino B — Peito / Tríceps',
    description: 'Desenvolvimento peitoral e tríceps',
    days: ['Terça', 'Sexta'],
    exercises: [
      { name: 'Supino Reto', sets: '4x8', rest: '90s', notes: 'Barra até tocar o peito' },
      { name: 'Supino Inclinado', sets: '3x10', rest: '60s', notes: 'Inclinação 30-45°' },
      { name: 'Crucifixo', sets: '3x10', rest: '60s', notes: 'Cotovelos levemente flexionados' },
      { name: 'Tríceps Testa', sets: '3x12', rest: '45s', notes: 'Cotovelos fixos' },
    ],
  },
  {
    id: 'p3',
    name: 'Treino C — Costas / Bíceps',
    description: 'Fortalecimento das costas e bíceps',
    days: ['Quarta', 'Sábado'],
    exercises: [
      { name: 'Puxada Frontal', sets: '4x10', rest: '90s', notes: 'Pegada pronada larga' },
      { name: 'Remada Curvada', sets: '3x10', rest: '60s', notes: 'Costas paralelas ao chão' },
      { name: 'Rosca Direta', sets: '3x12', rest: '45s', notes: 'Cotovelos fixos' },
      { name: 'Rosca Martelo', sets: '3x10', rest: '45s', notes: 'Pegada neutra' },
    ],
  },
];

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar dados do AsyncStorage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [workoutsData, plansData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.WORKOUTS),
        AsyncStorage.getItem(STORAGE_KEYS.PLANS),
      ]);

      if (workoutsData) {
        setWorkouts(JSON.parse(workoutsData));
      } else {
        // Primeira vez: salvar dados iniciais
        setWorkouts(initialWorkouts);
        await AsyncStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(initialWorkouts));
      }

      if (plansData) {
        setPlans(JSON.parse(plansData));
      } else {
        setPlans(initialPlans);
        await AsyncStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(initialPlans));
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  // Workouts
  const addWorkout = async (workout: Workout) => {
    const newWorkouts = [...workouts, workout];
    setWorkouts(newWorkouts);
    await AsyncStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(newWorkouts));
  };

  const updateWorkout = async (id: string, updatedWorkout: Partial<Workout>) => {
    const newWorkouts = workouts.map((w) => (w.id === id ? { ...w, ...updatedWorkout } : w));
    setWorkouts(newWorkouts);
    await AsyncStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(newWorkouts));
  };

  const deleteWorkout = async (id: string) => {
    const newWorkouts = workouts.filter((w) => w.id !== id);
    setWorkouts(newWorkouts);
    await AsyncStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(newWorkouts));
  };

  // Plans
  const addPlan = async (plan: Plan) => {
    const newPlans = [...plans, plan];
    setPlans(newPlans);
    await AsyncStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(newPlans));
  };

  const updatePlan = async (id: string, updatedPlan: Partial<Plan>) => {
    const newPlans = plans.map((p) => (p.id === id ? { ...p, ...updatedPlan } : p));
    setPlans(newPlans);
    await AsyncStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(newPlans));
  };

  const deletePlan = async (id: string) => {
    const newPlans = plans.filter((p) => p.id !== id);
    setPlans(newPlans);
    await AsyncStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(newPlans));
  };

  const getPlanById = (id: string) => {
    return plans.find((p) => p.id === id);
  };

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        plans,
        loading,
        addWorkout,
        updateWorkout,
        deleteWorkout,
        addPlan,
        updatePlan,
        deletePlan,
        getPlanById,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout deve ser usado dentro de WorkoutProvider');
  }
  return context;
};
