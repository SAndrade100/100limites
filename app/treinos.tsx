import CustomModal from '@/components/CustomModal';
import Header from '@/components/Header';
import WorkoutCard from '@/components/WorkoutCard';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockWorkouts = [
  {
    id: 'w1',
    title: 'Treino A — Pernas',
    time: '10:00',
    items: ['Agachamento 4x10', 'Leg press 3x12', 'Stiff 3x10'],
  },
  {
    id: 'w2',
    title: 'Treino B — Peito / Tríceps',
    time: '11:30',
    items: ['Supino 4x8', 'Cross-over 3x12', 'Tríceps 3x10'],
  },
  {
    id: 'w3',
    title: 'Treino C — Costas / Bíceps',
    time: '18:00',
    items: ['Puxada 4x10', 'Remada 3x12', 'Rosca 3x10'],
  },
];

export default function Treinos() {
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<typeof mockWorkouts[0] | null>(null);

  const handleWorkoutPress = (workout: typeof mockWorkouts[0]) => {
    setSelectedWorkout(workout);
    setShowModal(true);
  };

  const handleStartWorkout = () => {
    setShowModal(false);
    // Aqui você pode navegar para a tela de treino ativo
    console.log('Iniciando treino:', selectedWorkout?.title);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <Header name="Seus Treinos" />
      <View style={styles.container}>
        <Text style={styles.heading}>Meus treinos</Text>
        <FlatList
          data={mockWorkouts}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <WorkoutCard workout={item} onPress={() => handleWorkoutPress(item)} />
          )}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>

      <CustomModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title="Iniciar Treino"
        message={selectedWorkout ? `Pronto para começar o ${selectedWorkout.title}?` : ''}
        icon="dumbbell"
        iconColor="#87084E"
        primaryButton={{
          text: "Vamos lá!",
          onPress: handleStartWorkout,
        }}
        secondaryButton={{
          text: "Cancelar",
          onPress: () => setShowModal(false),
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF5F8' },
  container: { padding: 16, paddingTop: 12 },
  heading: { fontSize: 20, fontWeight: '700', color: '#3A1224', marginBottom: 12 },
});
