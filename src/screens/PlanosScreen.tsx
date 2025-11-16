import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import PlanCard from '../components/PlanCard';
import { useWorkout } from '../contexts/WorkoutContext';

export default function PlanosScreen() {
  const navigation = useNavigation<any>();
  const { plans } = useWorkout();

  const handlePlanPress = (planId: string) => {
    navigation.navigate('PlanoDetails', { id: planId });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <Header name="Planos" />
      <View style={styles.header}>
        <Text style={styles.heading}>Meus planos de treino</Text>
        <Text style={styles.subtitle}>Divisão ABC — Hipertrofia</Text>
      </View>
      <FlatList
        data={plans}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <PlanCard plan={item} onPress={() => handlePlanPress(item.id)} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF5F8' },
  header: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
  heading: { fontSize: 20, fontWeight: '700', color: '#3A1224', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#6b6b6b', marginBottom: 8 },
  listContent: { paddingHorizontal: 16, paddingBottom: 80 },
});
