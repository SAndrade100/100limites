import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useWorkout } from '../contexts/WorkoutContext';

export default function ExercisesScreen() {
  const navigation = useNavigation<any>();
  const { exerciseLibrary, deleteExerciseFromLibrary } = useWorkout();

  const handleDelete = (name: string) => {
    Alert.alert('Excluir exercício', `Deseja excluir "${name}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => deleteExerciseFromLibrary(name) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <Header name="Exercícios" />
      <View style={styles.container}>
        <FlatList
          data={exerciseLibrary}
          keyExtractor={(i) => i.name}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.sub}>{item.sets} {item.rest ? `· ${item.rest}` : ''}</Text>
              </View>
              <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('AddExercise', { exercise: item, originalName: item.name })}>
                <MaterialCommunityIcons name="pencil" size={20} color="#87084E" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon} onPress={() => handleDelete(item.name)}>
                <MaterialCommunityIcons name="delete" size={20} color="#d32f2f" />
              </TouchableOpacity>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        />

        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddExercise')}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF5F8' },
  container: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, marginHorizontal: 16, borderRadius: 10, elevation: 1 },
  name: { fontWeight: '700', color: '#3A1224' },
  sub: { color: '#666', fontSize: 12 },
  icon: { padding: 8, marginLeft: 8 },
  fab: { position: 'absolute', right: 20, bottom: 28, width: 56, height: 56, borderRadius: 28, backgroundColor: '#87084E', justifyContent: 'center', alignItems: 'center', elevation: 6 },
  fabText: { color: '#fff', fontSize: 28, lineHeight: 30 },
});
