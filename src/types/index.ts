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
  assessment?: AnthropometricAssessment;
}

export interface Skinfolds {
  bicipital: number; // mm
  tricipital: number;
  subscapular: number;
  peitoral: number;
  axilarMedia: number;
  cristaIliaca: number;
  supraespinhal: number;
  abdominal: number;
  coxaMedia: number;
  panturrilha: number;
}

export interface PerimetersCm {
  bracoRelaxado: number;
  bracoContraido: number;
  cintura: number;
  abdomen: number;
  quadril: number;
  coxaMedia: number;
  panturrilha: number;
}

export interface Basics {
  massaKg: number;
  estaturaM: number;
  idade?: number;
  dataAvaliacao?: string; // ISO
}

export interface BodyCompositionDistribution {
  massaCorporalTotalKg: number;
  massaMuscularEsqueleticaKg: number;
  massaGordaKg: number;
  massaRestanteKg: number;
}

export interface AnthropometricIndices {
  imc: number;
  imcClassificacao: string;
  cinturaClassificacao: string;
  relacaoCinturaQuadril: number;
  relacaoCinturaQuadrilClassificacao: string;
  indiceConicidade: number;
  indiceConicidadeClassificacao: string;
  relacaoCinturaEstatura: number;
  relacaoCinturaEstaturaClassificacao: string;
}

export interface AnthropometricAssessment {
  basics: Basics;
  perimeters: PerimetersCm;
  skinfolds: Skinfolds;
  indices: AnthropometricIndices;
  bodyComposition: BodyCompositionDistribution;
  observations?: string[];
  evaluator?: string;
  instruments?: {
    balanca?: string;
    estadimetro?: string;
    plicometro?: string;
    paquimetro?: string;
    contato?: string;
  };
}
