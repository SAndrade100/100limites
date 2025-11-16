import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWorkout } from '../contexts/WorkoutContext';

export default function PlanoDetailsScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { id } = route.params;
  const { getPlanById } = useWorkout();
  const plan = getPlanById(id);

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
            <View style={styles.exerciseNumber}>
              <Text style={styles.exerciseNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Text style={styles.exerciseSets}>{exercise.sets} · {exercise.rest} descanso</Text>
              {exercise.notes && <Text style={styles.exerciseNotes}>💡 {exercise.notes}</Text>}
            </View>
          </View>
        ))}

        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => navigation.navigate('TreinoAtivo', { id })}
        >
          <Text style={styles.startButtonText}>Iniciar Treino</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const colors = {
  primary: '#87084E',
  light: '#FFF5F8',
  dark: '#3A1224',
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.light },
  container: { padding: 16, paddingBottom: 40 },
  header: { marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '700', color: colors.dark, marginBottom: 8 },
  description: { fontSize: 15, color: '#6b6b6b', marginBottom: 12 },
  daysContainer: { flexDirection: 'row', alignItems: 'center' },
  daysLabel: { fontSize: 14, fontWeight: '600', color: colors.dark },
  daysText: { fontSize: 14, color: colors.primary, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#e0e0e0', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.dark, marginBottom: 16 },
  exerciseCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 1,
  },
  exerciseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  exerciseNumberText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  exerciseInfo: { flex: 1 },
  exerciseName: { fontSize: 16, fontWeight: '600', color: colors.dark, marginBottom: 4 },
  exerciseSets: { fontSize: 13, color: '#6b6b6b', marginBottom: 4 },
  exerciseNotes: { fontSize: 12, color: '#888', fontStyle: 'italic' },
  startButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    elevation: 2,
  },
  startButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
