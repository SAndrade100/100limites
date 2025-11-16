import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Plan } from '../types';

const PlanCard = ({ plan, onPress }: { plan: Plan; onPress?: () => void }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Text style={styles.name}>{plan.name}</Text>
      <Text style={styles.description}>{plan.description}</Text>
      <Text style={styles.days}>Dias: {plan.days.join(', ')}</Text>
      <View style={styles.divider} />
      <Text style={styles.sectionTitle}>Exercícios:</Text>
      {plan.exercises.map((exercise, i) => (
        <Text key={i} style={styles.exercise}>• {exercise.name} {exercise.sets}</Text>
      ))}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  name: { fontWeight: '700', fontSize: 18, color: '#3A1224', marginBottom: 8 },
  description: { color: '#6b6b6b', fontSize: 14, marginBottom: 8 },
  days: { color: '#87084E', fontSize: 12, fontWeight: '600', marginBottom: 12 },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginBottom: 12 },
  sectionTitle: { fontWeight: '600', fontSize: 14, color: '#3A1224', marginBottom: 6 },
  exercise: { color: '#6b6b6b', fontSize: 14, marginBottom: 4 },
});

export default PlanCard;
