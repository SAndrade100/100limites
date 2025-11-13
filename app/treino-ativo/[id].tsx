import CustomModal from '@/components/CustomModal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data - em produção viria de um estado global ou API
const mockPlans = [
  {
    id: 'p1',
    name: 'Treino A — Pernas',
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

export default function ActiveWorkout() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const plan = mockPlans.find(p => p.id === id);

  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!plan) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text>Treino não encontrado</Text>
      </SafeAreaView>
    );
  }

  const toggleExercise = (index: number) => {
    if (completedExercises.includes(index)) {
      setCompletedExercises(completedExercises.filter(i => i !== index));
    } else {
      setCompletedExercises([...completedExercises, index]);
      // Avança para o próximo exercício não concluído
      if (index === currentExercise && index < plan.exercises.length - 1) {
        setCurrentExercise(index + 1);
      }
    }
  };

  const finishWorkout = () => {
    setShowFinishModal(true);
  };

  const handleConfirmFinish = () => {
    setShowFinishModal(false);
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.back();
  };

  const progress = (completedExercises.length / plan.exercises.length) * 100;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="close" size={28} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{plan.name}</Text>
          <Text style={styles.headerSubtitle}>
            {completedExercises.length} de {plan.exercises.length} exercícios
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{Math.round(progress)}%</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {plan.exercises.map((exercise, index) => {
          const isCompleted = completedExercises.includes(index);
          const isCurrent = currentExercise === index;
          
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.exerciseCard,
                isCompleted && styles.exerciseCompleted,
                isCurrent && !isCompleted && styles.exerciseCurrent,
              ]}
              onPress={() => toggleExercise(index)}
              activeOpacity={0.7}
            >
              <View style={styles.exerciseHeader}>
                <View style={styles.exerciseLeft}>
                  <View style={[
                    styles.checkbox,
                    isCompleted && styles.checkboxCompleted
                  ]}>
                    {isCompleted && (
                      <MaterialCommunityIcons name="check" size={20} color="#fff" />
                    )}
                  </View>
                  <View style={styles.exerciseInfo}>
                    <Text style={[
                      styles.exerciseName,
                      isCompleted && styles.exerciseNameCompleted
                    ]}>
                      {exercise.name}
                    </Text>
                    <Text style={styles.exerciseSets}>{exercise.sets}</Text>
                  </View>
                </View>
                {isCurrent && !isCompleted && (
                  <View style={styles.currentBadge}>
                    <Text style={styles.currentBadgeText}>Atual</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.exerciseDetails}>
                <View style={styles.detailItem}>
                  <MaterialCommunityIcons name="timer-outline" size={16} color="#6b6b6b" />
                  <Text style={styles.detailText}>Descanso: {exercise.rest}</Text>
                </View>
              </View>
              
              <Text style={styles.exerciseNotes}>{exercise.notes}</Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity 
          style={[
            styles.finishButton,
            completedExercises.length === 0 && styles.finishButtonDisabled
          ]}
          onPress={finishWorkout}
          disabled={completedExercises.length === 0}
        >
          <MaterialCommunityIcons name="check-circle" size={24} color="#fff" />
          <Text style={styles.finishButtonText}>Finalizar Treino</Text>
        </TouchableOpacity>
      </ScrollView>

      <CustomModal
        visible={showFinishModal}
        onClose={() => setShowFinishModal(false)}
        title="Finalizar Treino"
        message={`Você completou ${completedExercises.length} de ${plan.exercises.length} exercícios.\n\nDeseja finalizar o treino?`}
        icon="dumbbell"
        iconColor="#87084E"
        primaryButton={{
          text: 'Finalizar',
          onPress: handleConfirmFinish,
        }}
        secondaryButton={{
          text: 'Continuar',
          onPress: () => setShowFinishModal(false),
        }}
      />

      <CustomModal
        visible={showSuccessModal}
        onClose={handleSuccessClose}
        title="Parabéns! 🎉"
        message="Treino finalizado com sucesso!"
        icon="trophy-outline"
        iconColor="#FFB800"
        primaryButton={{
          text: 'Concluir',
          onPress: handleSuccessClose,
          color: '#87084E',
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF5F8' },
  header: {
    backgroundColor: '#87084E',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 12,
  },
  backButton: {
    marginRight: 12,
  },
  headerInfo: { flex: 1 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 2 },
  headerSubtitle: { fontSize: 13, color: '#FFF5F8', opacity: 0.9 },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#87084E',
    borderRadius: 4,
  },
  progressText: { fontSize: 14, fontWeight: '700', color: '#87084E', minWidth: 40 },
  container: { padding: 16, paddingBottom: 40 },
  exerciseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#f0f0f0',
  },
  exerciseCurrent: {
    borderColor: '#87084E',
    backgroundColor: '#FFF5F8',
  },
  exerciseCompleted: {
    backgroundColor: '#f8f8f8',
    opacity: 0.7,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  exerciseLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#d0d0d0',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#87084E',
    borderColor: '#87084E',
  },
  exerciseInfo: { flex: 1 },
  exerciseName: { fontSize: 16, fontWeight: '600', color: '#3A1224', marginBottom: 4 },
  exerciseNameCompleted: {
    textDecorationLine: 'line-through',
    color: '#6b6b6b',
  },
  exerciseSets: { fontSize: 14, color: '#87084E', fontWeight: '600' },
  currentBadge: {
    backgroundColor: '#87084E',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  currentBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  exerciseDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: { fontSize: 13, color: '#6b6b6b', marginLeft: 6 },
  exerciseNotes: { fontSize: 13, color: '#888', fontStyle: 'italic' },
  finishButton: {
    backgroundColor: '#87084E',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  finishButtonDisabled: {
    backgroundColor: '#d0d0d0',
  },
  finishButtonText: { color: '#fff', fontSize: 16, fontWeight: '700', marginLeft: 8 },
});
