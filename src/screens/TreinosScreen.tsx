import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomModal from '../components/CustomModal';
import Header from '../components/Header';
import WorkoutCard from '../components/WorkoutCard';
import { useWorkout } from '../contexts/WorkoutContext';
import { Workout } from '../types';

export default function TreinosScreen() {
  const navigation = useNavigation<any>();
  const { workouts } = useWorkout();
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleWorkoutPress = (workout: Workout) => {
    setSelectedWorkout(workout);
    setShowModal(true);
  };

  const handleStartWorkout = () => {
    setShowModal(false);
    if (selectedWorkout) {
      navigation.navigate('TreinoAtivo', { id: selectedWorkout.id });
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <Header name="Seus Treinos" />
      <View style={styles.container}>
        <Text style={styles.heading}>Meus treinos</Text>
        <FlatList
          data={workouts}
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

      {/* Floating add button */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() => setShowAddModal(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <CustomModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Adicionar"
        message="O que você quer adicionar?"
        icon="plus-box"
        iconColor="#87084E"
        secondaryButton={{
          text: 'Adicionar Exercício',
          onPress: () => {
            setShowAddModal(false);
            navigation.navigate('AddExercise');
          },
        }}
        primaryButton={{
          text: 'Criar Plano',
          onPress: () => {
            setShowAddModal(false);
            navigation.navigate('CreateWorkout');
          },
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF5F8' },
  container: { padding: 16, paddingTop: 12 },
  heading: { fontSize: 20, fontWeight: '700', color: '#3A1224', marginBottom: 12 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#87084E',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  fabText: { color: '#fff', fontSize: 28, lineHeight: 30 },
});
