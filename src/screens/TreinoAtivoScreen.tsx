import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomModal from '../components/CustomModal';
import { useHistory } from '../contexts/HistoryContext';
import { useWorkout } from '../contexts/WorkoutContext';

export default function TreinoAtivoScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const id: string | undefined = route.params?.id ?? route.params?.planId;
  const { getPlanById } = useWorkout();
  const { addWorkoutToHistory } = useHistory();
  const plan = id ? getPlanById(id) : undefined;
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [startTime] = useState(new Date());

  if (!id) {
    return (
      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <View style={styles.header}> 
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <View style={{flex: 1, marginLeft: 16}}>
            <Text style={styles.headerTitle}>Treino inválido</Text>
            <Text style={styles.headerSubtitle}>Nenhum treino selecionado</Text>
          </View>
        </View>
        <View style={{ padding: 16 }}>
          <Text style={{ color: colors.dark }}>Não foi possível encontrar o treino solicitado.</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!plan) {
    return (
      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <View style={{flex: 1, marginLeft: 16}}>
            <Text style={styles.headerTitle}>Treino não encontrado</Text>
            <Text style={styles.headerSubtitle}>O plano solicitado não existe ou foi removido.</Text>
          </View>
        </View>
        <View style={{ padding: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 12 }}>
            <Text style={{ color: colors.primary }}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const toggleExercise = (index: number) => {
    if (completedExercises.includes(index)) {
      setCompletedExercises(completedExercises.filter(i => i !== index));
    } else {
      setCompletedExercises([...completedExercises, index]);
    }
  };

  const progress = plan.exercises.length ? (completedExercises.length / plan.exercises.length) * 100 : 0;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="close" size={28} color="#fff" />
        </TouchableOpacity>
        <View style={{flex: 1, marginLeft: 16}}>
          <Text style={styles.headerTitle}>{plan.name}</Text>
          <Text style={styles.headerSubtitle}>{completedExercises.length} de {plan.exercises.length} concluídos</Text>
        </View>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {plan.exercises.map((exercise, index) => {
          const isCompleted = completedExercises.includes(index);
          return (
            <TouchableOpacity
              key={index}
              style={[styles.exerciseCard, isCompleted && styles.exerciseCardCompleted]}
              onPress={() => toggleExercise(index)}
            >
              <View style={[styles.checkbox, isCompleted && styles.checkboxChecked]}>
                {isCompleted && <MaterialCommunityIcons name="check" size={20} color="#fff" />}
              </View>
              <View style={styles.exerciseInfo}>
                <Text style={[styles.exerciseName, isCompleted && styles.textCompleted]}>
                  {exercise.name}
                </Text>
                <Text style={[styles.exerciseSets, isCompleted && styles.textCompleted]}>
                  {exercise.sets}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={styles.finishButton}
          onPress={() => setShowFinishModal(true)}
        >
          <Text style={styles.finishButtonText}>Finalizar Treino</Text>
        </TouchableOpacity>
      </ScrollView>

      <CustomModal
        visible={showFinishModal}
        onClose={() => setShowFinishModal(false)}
        title="Finalizar Treino"
        message="Deseja finalizar o treino agora?"
        icon="check-circle"
        iconColor="#87084E"
        primaryButton={{
          text: "Finalizar",
          onPress: () => {
            // Calcula a duração do treino em minutos
            const endTime = new Date();
            const durationMinutes = Math.round((endTime.getTime() - startTime.getTime()) / 60000);
            
            // Salva no histórico
            if (plan) {
              addWorkoutToHistory({
                id: Date.now().toString(),
                planId: plan.id,
                planName: plan.name,
                date: endTime.toISOString(),
                duration: durationMinutes,
                completedExercises: completedExercises.length,
                totalExercises: plan.exercises.length,
              });
            }
            
            setShowFinishModal(false);
            setShowSuccessModal(true);
          },
        }}
        secondaryButton={{
          text: "Continuar",
          onPress: () => setShowFinishModal(false),
        }}
      />

      <CustomModal
        visible={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigation.goBack();
        }}
        title="Parabéns!"
        message="Treino concluído com sucesso!"
        icon="trophy"
        iconColor="#87084E"
        primaryButton={{
          text: "OK",
          onPress: () => {
            setShowSuccessModal(false);
            navigation.goBack();
          },
        }}
      />
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
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  headerSubtitle: { color: 'rgba(255,255,255,0.9)', fontSize: 13, marginTop: 2 },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
  },
  progressFill: {
    height: 4,
    backgroundColor: colors.primary,
  },
  container: { padding: 16, paddingBottom: 40 },
  exerciseCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 1,
  },
  exerciseCardCompleted: {
    backgroundColor: '#f5f5f5',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  exerciseInfo: { flex: 1 },
  exerciseName: { fontSize: 16, fontWeight: '600', color: colors.dark },
  exerciseSets: { fontSize: 13, color: '#6b6b6b', marginTop: 2 },
  textCompleted: { textDecorationLine: 'line-through', opacity: 0.6 },
  finishButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    elevation: 2,
  },
  finishButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
