import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useWorkout } from '../contexts/WorkoutContext';
import { Exercise, Plan } from '../types';

export default function CreateWorkoutScreen() {
  const navigation = useNavigation<any>();
  const { exerciseLibrary, addPlan, updatePlan } = useWorkout();
  const route = useRoute<any>();
  const editingPlan: Plan | undefined = route.params?.plan;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [daysText, setDaysText] = useState('');
  const [selected, setSelected] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (editingPlan) {
      setName(editingPlan.name || '');
      setDescription(editingPlan.description || '');
      setDaysText(editingPlan.days ? editingPlan.days.join(', ') : '');
      // mark selected exercises by matching names
      const sel = new Set<number>();
      editingPlan.exercises.forEach((ex) => {
        const idx = exerciseLibrary.findIndex((e) => e.name === ex.name);
        if (idx >= 0) sel.add(idx);
      });
      setSelected(sel);
    }
  }, [editingPlan, exerciseLibrary]);

  const toggleSelect = (index: number) => {
    const copy = new Set(selected);
    if (copy.has(index)) {
      copy.delete(index);
    } else {
      copy.add(index);
    }
    setSelected(copy);
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Informe um nome para o plano.');
      return;
    }

    const days = daysText.split(',').map((d) => d.trim()).filter(Boolean);
    const chosen: Exercise[] = Array.from(selected).map((i) => exerciseLibrary[i]);

    try {
      if (editingPlan) {
        const updated: Partial<Plan> = {
          name: name.trim(),
          description: description.trim(),
          days,
          exercises: chosen,
        };
        await updatePlan(editingPlan.id, updated);
      } else {
        const plan: Plan = {
          id: Date.now().toString(),
          name: name.trim(),
          description: description.trim(),
          days,
          exercises: chosen,
        };
        await addPlan(plan);
      }
      navigation.navigate('Planos' as any);
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível criar/atualizar o plano.');
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <Header name="Novo Plano" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Nome do Plano</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Treino A — Pernas" />

        <Text style={styles.label}>Descrição</Text>
        <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Foco em glúteos" />

        <Text style={styles.label}>Dias (separados por vírgula)</Text>
        <TextInput style={styles.input} value={daysText} onChangeText={setDaysText} placeholder="Segunda, Quinta" />

        <Text style={[styles.label, { marginTop: 12 }]}>Selecionar Exercícios</Text>
        {exerciseLibrary.length === 0 ? (
          <View style={styles.placeholder}><Text style={{ color: '#666' }}>Nenhum exercício cadastrado. Use "Adicionar Exercício".</Text></View>
        ) : (
          <View>
            {exerciseLibrary.map((item, index) => (
              <TouchableOpacity key={index} style={styles.exerciseRow} onPress={() => toggleSelect(index)}>
                <View style={[styles.checkbox, selected.has(index) && styles.checkboxChecked]}>{selected.has(index) ? <Text style={{color:'#fff'}}>✓</Text> : null}</View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.exerciseName}>{item.name}</Text>
                  <Text style={styles.exerciseSets}>{item.sets} {item.rest ? `· ${item.rest}` : ''}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleCreate}>
          <Text style={styles.saveButtonText}>Criar Plano</Text>
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
  placeholder: { backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#eee', alignItems: 'center' },
  exerciseRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 8, elevation: 1 },
  checkbox: { width: 28, height: 28, borderRadius: 6, borderWidth: 1, borderColor: '#ddd', marginRight: 12, justifyContent: 'center', alignItems: 'center' },
  checkboxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  exerciseName: { fontWeight: '600', color: colors.dark },
  exerciseSets: { color: '#666', fontSize: 12 },
  saveButton: { backgroundColor: colors.primary, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  saveButtonText: { color: '#fff', fontWeight: '700' },
});
