import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data - em produção viria de um estado global ou API
const mockPlans = [
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
      { name: 'Cadeira Flexora', sets: '3x12', rest: '45s', notes: 'Controlar a descida' },
      { name: 'Panturrilha no Smith', sets: '4x15', rest: '45s', notes: 'Amplitude total' },
    ],
  },
  {
    id: 'p2',
    name: 'Treino B — Peito / Tríceps',
    description: 'Desenvolvimento peitoral e tríceps',
    days: ['Terça', 'Sexta'],
    exercises: [
      { name: 'Supino Reto', sets: '4x8', rest: '90s', notes: 'Barra até tocar o peito' },
      { name: 'Supino Inclinado', sets: '3x10', rest: '60s', notes: 'Inclinação 30-45°' },
      { name: 'Crucifixo Inclinado', sets: '3x10', rest: '60s', notes: 'Cotovelos levemente flexionados' },
      { name: 'Tríceps Testa', sets: '3x12', rest: '45s', notes: 'Cotovelos fixos' },
      { name: 'Paralelas', sets: '3x10', rest: '60s', notes: 'Corpo ligeiramente inclinado' },
      { name: 'Tríceps Corda', sets: '3x15', rest: '45s', notes: 'Extensão completa' },
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
      { name: 'Remada Cavalinho', sets: '3x12', rest: '60s', notes: 'Puxar até o abdômen' },
      { name: 'Pulldown', sets: '3x12', rest: '45s', notes: 'Braços estendidos' },
      { name: 'Rosca Direta', sets: '3x12', rest: '45s', notes: 'Cotovelos fixos' },
      { name: 'Rosca Martelo', sets: '3x10', rest: '45s', notes: 'Pegada neutra' },
    ],
  },
];

export default function PlanDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const plan = mockPlans.find(p => p.id === id);

  if (!plan) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text>Plano não encontrado</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{plan.name}</Text>
          <Text style={styles.description}>{plan.description}</Text>
          <View style={styles.daysContainer}>
            <Text style={styles.daysLabel}>Dias: </Text>
            <Text style={styles.daysText}>{plan.days.join(', ')}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Exercícios do Treino</Text>
        
        {plan.exercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseCard}>
            <View style={styles.exerciseHeader}>
              <Text style={styles.exerciseNumber}>{index + 1}</Text>
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseSets}>{exercise.sets}</Text>
              </View>
            </View>
            <Text style={styles.exerciseRest}>Descanso: {exercise.rest}</Text>
            <Text style={styles.exerciseNotes}>{exercise.notes}</Text>
          </View>
        ))}

        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => router.push(`/treino-ativo/${id}` as any)}
        >
          <Text style={styles.startButtonText}>Iniciar Treino</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF5F8' },
  container: { padding: 16, paddingBottom: 40 },
  header: { marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#3A1224', marginBottom: 8 },
  description: { fontSize: 16, color: '#6b6b6b', marginBottom: 12 },
  daysContainer: { flexDirection: 'row', alignItems: 'center' },
  daysLabel: { fontSize: 14, fontWeight: '600', color: '#3A1224' },
  daysText: { fontSize: 14, color: '#87084E', fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#e0e0e0', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#3A1224', marginBottom: 16 },
  exerciseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  exerciseHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  exerciseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#87084E',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 32,
    fontWeight: '700',
    fontSize: 16,
    marginRight: 12,
  },
  exerciseInfo: { flex: 1 },
  exerciseName: { fontSize: 16, fontWeight: '600', color: '#3A1224', marginBottom: 4 },
  exerciseSets: { fontSize: 14, color: '#87084E', fontWeight: '600' },
  exerciseRest: { fontSize: 13, color: '#6b6b6b', marginBottom: 6, marginLeft: 44 },
  exerciseNotes: { fontSize: 13, color: '#888', fontStyle: 'italic', marginLeft: 44 },
  startButton: {
    backgroundColor: '#87084E',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    elevation: 2,
  },
  startButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
