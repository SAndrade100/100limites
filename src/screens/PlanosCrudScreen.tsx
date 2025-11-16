import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useWorkout } from '../contexts/WorkoutContext';

export default function PlanosCrudScreen() {
  const navigation = useNavigation<any>();
  const { plans, deletePlan } = useWorkout();

  const handleDelete = (id: string) => {
    Alert.alert('Excluir plano', 'Deseja excluir este plano?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => deletePlan(id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <Header name="Planos" />
      <FlatList
        data={plans}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.days}>Dias: {item.days.join(', ')}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => navigation.navigate('CreateWorkout', { plan: item })} style={styles.icon}>
                <MaterialCommunityIcons name="pencil" size={20} color="#87084E" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.icon}>
                <MaterialCommunityIcons name="delete" size={20} color="#d32f2f" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
      />

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateWorkout')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF5F8' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center', elevation: 1 },
  title: { fontWeight: '700', color: '#3A1224' },
  desc: { color: '#666', fontSize: 12 },
  days: { color: '#87084E', fontSize: 12, marginTop: 6 },
  actions: { flexDirection: 'row', marginLeft: 8 },
  icon: { padding: 8 },
  fab: { position: 'absolute', right: 20, bottom: 28, width: 56, height: 56, borderRadius: 28, backgroundColor: '#87084E', justifyContent: 'center', alignItems: 'center', elevation: 6 },
  fabText: { color: '#fff', fontSize: 28, lineHeight: 30 },
});
