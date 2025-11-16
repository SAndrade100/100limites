export interface Exercise {
  name: string;
  sets: string;
  rest?: string;
  notes?: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  days: string[];
  exercises: Exercise[];
  active?: boolean;
}

export interface Workout {
  id: string;
  title: string;
  items: string[];
  time?: string;
}

export interface WorkoutHistory {
  id: string;
  planId: string;
  planName: string;
  date: string; // ISO string
  duration: number; // minutos
  completedExercises: number;
  totalExercises: number;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
  stats: {
    totalWorkouts: number;
    weeksActive: number;
    consistency: number; // porcentagem
  };
}
