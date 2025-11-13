import Header from '@/components/Header';
import PlanCard from '@/components/PlanCard';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockPlans = [
  {
    id: 'p1',
    name: 'Treino A — Pernas',
    description: 'Foco em membros inferiores e glúteos',
    days: ['Segunda', 'Quinta'],
    exercises: ['Agachamento 4x10', 'Leg Press 3x12', 'Stiff 3x10', 'Cadeira Extensora 3x12'],
    active: true,
  },
  {
    id: 'p2',
    name: 'Treino B — Peito / Tríceps',
    description: 'Desenvolvimento peitoral e tríceps',
    days: ['Terça', 'Sexta'],
    exercises: ['Supino 4x8', 'Crucifixo 3x10', 'Tríceps Testa 3x12', 'Paralelas 3x10'],
  },
  {
    id: 'p3',
    name: 'Treino C — Costas / Bíceps',
    description: 'Fortalecimento das costas e bíceps',
    days: ['Quarta', 'Sábado'],
    exercises: ['Puxada 4x10', 'Remada Curvada 3x10', 'Rosca Direta 3x12', 'Rosca Martelo 3x10'],
  },
];

export default function Planos() {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <Header name="Planos" />
      <View style={styles.container}>
        <Text style={styles.heading}>Meus planos de treino</Text>
        <Text style={styles.subtitle}>Divisão ABC — Hipertrofia</Text>
        <FlatList
          data={mockPlans}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => <PlanCard plan={item} />}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF5F8' },
  container: { padding: 16, paddingTop: 12 },
  heading: { fontSize: 20, fontWeight: '700', color: '#3A1224', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#6b6b6b', marginBottom: 16 },
});
