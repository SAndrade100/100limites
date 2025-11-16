import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AnthropometricAssessment, User } from '../types';

interface UserContextData {
  user: User | null;
  loading: boolean;
  updateUser: (user: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

const STORAGE_KEY = '@100limites:user';

// Funções auxiliares para calcular índices antropométricos
function calcularIMC(pesoKg: number, estaturaM: number): number {
  return +(pesoKg / (estaturaM * estaturaM)).toFixed(1);
}

function classificarIMC(imc: number): string {
  if (imc < 18.5) return 'Magreza';
  if (imc < 25) return 'Normal';
  if (imc < 30) return 'Sobrepeso';
  if (imc < 35) return 'Obesidade I';
  if (imc < 40) return 'Obesidade II';
  return 'Obesidade III';
}

function cinturaClassificacao(cintura: number, sexo: 'F' | 'M'): string {
  // Simplificado: pontos de corte comuns (F >=80 risco alto, M >=94 risco alto)
  if (sexo === 'F') return cintura >= 80 ? 'Risco Alto' : 'Risco Baixo';
  return cintura >= 94 ? 'Risco Alto' : 'Risco Baixo';
}

function relacaoCinturaQuadril(cintura: number, quadril: number): number {
  return +(cintura / quadril).toFixed(2);
}

function classificarRCQ(valor: number, sexo: 'F' | 'M'): string {
  // Limiares simplificados
  if (sexo === 'F') return valor < 0.85 ? 'Risco Baixo' : 'Risco Aumentado';
  return valor < 0.90 ? 'Risco Baixo' : 'Risco Aumentado';
}

function indiceConicidade(cintura: number, pesoKg: number, estaturaM: number): number {
  // Fórmula aproximada CI = cintura / (0.109 * sqrt(peso/estatura))
  const ci = cintura / (0.109 * Math.sqrt(pesoKg / estaturaM));
  return +ci.toFixed(2);
}

function classificarConicidade(ci: number, sexo: 'F' | 'M', idade?: number): string {
  // Simplificado conforme nota: considerar corte 1.22 para mulheres >50 anos
  if (sexo === 'F' && idade && idade > 50) return ci >= 1.22 ? 'Risco Alto' : 'Risco Baixo';
  // Caso geral
  return ci >= 1.25 ? 'Risco Alto' : 'Risco Baixo';
}

function relacaoCinturaEstatura(cintura: number, estaturaM: number): number {
  return +(cintura / (estaturaM * 100)).toFixed(2); // cintura(cm)/estatura(cm)
}

function classificarCinturaEstatura(valor: number): string {
  return valor >= 0.5 ? 'Risco Aumentado' : 'Risco Baixo';
}

const baseBasics = { massaKg: 71.9, estaturaM: 1.58, idade: 21, dataAvaliacao: '2025-11-10' };
const basePerimeters = {
  bracoRelaxado: 30.5,
  bracoContraido: 31,
  cintura: 80,
  abdomen: 89,
  quadril: 107,
  coxaMedia: 61,
  panturrilha: 39,
};
const baseSkinfolds = {
  bicipital: 15,
  tricipital: 21,
  subscapular: 21,
  peitoral: 21,
  axilarMedia: 19,
  cristaIliaca: 27,
  supraespinhal: 17,
  abdominal: 28,
  coxaMedia: 25,
  panturrilha: 19,
};
// Índices calculados a partir dos valores base
const computedIndices = (() => {
  const { massaKg, estaturaM, idade } = baseBasics;
  const { cintura, quadril } = basePerimeters;
  const imc = calcularIMC(massaKg, estaturaM);
  const rcq = relacaoCinturaQuadril(cintura, quadril);
  const ci = indiceConicidade(cintura, massaKg, estaturaM);
  const rce = relacaoCinturaEstatura(cintura, estaturaM);
  return {
    imc,
    imcClassificacao: classificarIMC(imc),
    cinturaClassificacao: cinturaClassificacao(cintura, 'F'),
    relacaoCinturaQuadril: rcq,
    relacaoCinturaQuadrilClassificacao: classificarRCQ(rcq, 'F'),
    indiceConicidade: ci,
    indiceConicidadeClassificacao: classificarConicidade(ci, 'F', idade),
    relacaoCinturaEstatura: rce,
    relacaoCinturaEstaturaClassificacao: classificarCinturaEstatura(rce),
  };
})();
const defaultAssessment: AnthropometricAssessment = {
  basics: baseBasics,
  perimeters: basePerimeters,
  skinfolds: baseSkinfolds,
  indices: computedIndices,
  bodyComposition: {
    massaCorporalTotalKg: 71.9,
    massaMuscularEsqueleticaKg: 25.0,
    massaGordaKg: 18.7,
    massaRestanteKg: 28.2,
  },
  observations: [],
  evaluator: 'Karoline Leite',
  instruments: {
    balanca: 'Omron',
    estadimetro: 'Ultrassônico - Avanutri',
    plicometro: 'Cescorf Científico',
    paquimetro: 'Cescorf 16 cm',
    contato: 'karoline@example.com',
  },
};

const defaultUser: User = {
  name: 'Beatriz Honorato Pereira',
  email: 'beatriz@example.com',
  stats: {
    totalWorkouts: 45,
    weeksActive: 12,
    consistency: 78,
  },
  assessment: defaultAssessment,
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setUser(JSON.parse(data));
      } else {
        // Primeira vez: usar dados padrão
        setUser(defaultUser);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUser));
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updatedUser: Partial<User>) => {
    if (!user) return;
    
    const newUser = { ...user, ...updatedUser };
    setUser(newUser);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de UserProvider');
  }
  return context;
};
