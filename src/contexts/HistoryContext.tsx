import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { WorkoutHistory } from '../types';

interface HistoryContextData {
  history: WorkoutHistory[];
  loading: boolean;
  addWorkoutToHistory: (workout: WorkoutHistory) => Promise<void>;
  getHistoryByMonth: (year: number, month: number) => WorkoutHistory[];
  getTrainedDatesByMonth: (year: number, month: number) => number[];
  getTotalStats: () => {
    totalWorkouts: number;
    totalMinutes: number;
    avgDuration: number;
    totalExercises: number;
  };
}

const HistoryContext = createContext<HistoryContextData>({} as HistoryContextData);

const STORAGE_KEY = '@100limites:history';

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<WorkoutHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setHistory(JSON.parse(data));
      }
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    } finally {
      setLoading(false);
    }
  };

  const addWorkoutToHistory = async (workout: WorkoutHistory) => {
    const newHistory = [...history, workout];
    setHistory(newHistory);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  };

  const getHistoryByMonth = (year: number, month: number) => {
    return history.filter((item) => {
      const date = new Date(item.date);
      return date.getFullYear() === year && date.getMonth() === month;
    });
  };

  const getTrainedDatesByMonth = (year: number, month: number) => {
    const items = getHistoryByMonth(year, month);
    const set = new Set<number>();
    items.forEach((it) => {
      const d = new Date(it.date);
      set.add(d.getDate());
    });
    return Array.from(set).sort((a, b) => a - b);
  };

  const getTotalStats = () => {
    const totalWorkouts = history.length;
    const totalMinutes = history.reduce((acc, item) => acc + item.duration, 0);
    const avgDuration = totalWorkouts > 0 ? Math.round(totalMinutes / totalWorkouts) : 0;
    const totalExercises = history.reduce((acc, item) => acc + item.completedExercises, 0);

    return { totalWorkouts, totalMinutes, avgDuration, totalExercises };
  };

  return (
    <HistoryContext.Provider
      value={{
        history,
        loading,
  addWorkoutToHistory,
  getHistoryByMonth,
  getTrainedDatesByMonth,
  getTotalStats,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory deve ser usado dentro de HistoryProvider');
  }
  return context;
};
