import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF5F8' },
  container: { padding: 16, paddingTop: 12 },
  heading: { fontSize: 20, fontWeight: '700', color: '#3A1224', marginBottom: 12 },
});
