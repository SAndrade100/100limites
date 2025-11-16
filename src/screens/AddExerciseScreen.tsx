import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useWorkout } from '../contexts/WorkoutContext';
import { Exercise } from '../types';

export default function AddExerciseScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { addExerciseToLibrary, updateExerciseInLibrary } = useWorkout();

  const [name, setName] = useState('');
  const [sets, setSets] = useState('');
  const [rest, setRest] = useState('');
  const [notes, setNotes] = useState('');

  const editing: { exercise?: Exercise; originalName?: string } = route.params || {};

  const handleSave = async () => {
    if (!name.trim() || !sets.trim()) {
      Alert.alert('Erro', 'Preencha nome e sets do exercício.');
      return;
    }

    const exercise: Exercise = { name: name.trim(), sets: sets.trim(), rest: rest.trim() || undefined, notes: notes.trim() || undefined };
    try {
      if (editing && editing.originalName) {
        await updateExerciseInLibrary(editing.originalName, exercise);
      } else {
        await addExerciseToLibrary(exercise);
      }
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível salvar o exercício.');
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <Header name="Adicionar Exercício" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Agachamento" />

        <Text style={styles.label}>Séries / Repetições</Text>
        <TextInput style={styles.input} value={sets} onChangeText={setSets} placeholder="4x10" />

        <Text style={styles.label}>Descanso (opcional)</Text>
        <TextInput style={styles.input} value={rest} onChangeText={setRest} placeholder="60s" />

        <Text style={styles.label}>Notas (opcional)</Text>
        <TextInput style={[styles.input, { height: 80 }]} value={notes} onChangeText={setNotes} placeholder="Dica de execução" multiline />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar Exercício</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const colors = { primary: '#87084E', light: '#FFF5F8', dark: '#3A1224' };

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.light },
  container: { padding: 16, paddingBottom: 40 },
  label: { color: colors.dark, fontWeight: '700', marginBottom: 6 },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#eee' },
  saveButton: { backgroundColor: colors.primary, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  saveButtonText: { color: '#fff', fontWeight: '700' },
});
