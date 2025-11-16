import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';

export default function HistoricoScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <Header name="Histórico" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Histórico de Treinos</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>45</Text>
            <Text style={styles.statLabel}>Treinos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Semanas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>78%</Text>
            <Text style={styles.statLabel}>Consistência</Text>
          </View>
        </View>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Calendário em desenvolvimento</Text>
        </View>
      </ScrollView>
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
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: '700', color: colors.dark, marginBottom: 16 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 1,
  },
  statNumber: { fontSize: 24, fontWeight: '700', color: colors.primary },
  statLabel: { fontSize: 12, color: '#6b6b6b', marginTop: 4 },
  placeholder: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    elevation: 1,
  },
  placeholderText: { color: '#6b6b6b' },
});
