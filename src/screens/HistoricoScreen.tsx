import React, { useMemo } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useHistory } from '../contexts/HistoryContext';

export default function HistoricoScreen() {
  const { history } = useHistory();

  const stats = useMemo(() => {
    const totalWorkouts = history.length;

    if (totalWorkouts === 0) {
      return { totalWorkouts: 0, weeksActive: 0, consistency: 0 };
    }

    const dates = history.map((h) => new Date(h.date));
    const times = dates.map((d) => d.getTime());
    const min = Math.min(...times);
    const max = Math.max(...times);
    const daysSpan = Math.max(1, Math.ceil((max - min) / (1000 * 60 * 60 * 24)) + 1);
    const weeksActive = Math.max(1, Math.ceil(daysSpan / 7));

    const distinctDays = new Set(dates.map((d) => d.toDateString())).size;
    const consistency = Math.min(100, Math.round((distinctDays / (weeksActive * 7)) * 100));

    return { totalWorkouts, weeksActive, consistency };
  }, [history]);

  const sorted = useMemo(() => {
    return [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [history]);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <Header name="Histórico" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Histórico de Treinos</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalWorkouts}</Text>
            <Text style={styles.statLabel}>Treinos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.weeksActive}</Text>
            <Text style={styles.statLabel}>Semanas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.consistency}%</Text>
            <Text style={styles.statLabel}>Consistência</Text>
          </View>
        </View>

        {history.length === 0 ? (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Nenhum treino registrado ainda</Text>
          </View>
        ) : (
          <FlatList
            data={sorted}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <View style={styles.historyItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.historyTitle}>{item.planName}</Text>
                  <Text style={styles.historySub}>{new Date(item.date).toLocaleString()}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.historyDuration}>{item.duration}m</Text>
                  <Text style={styles.historySub}>{item.completedExercises}/{item.totalExercises}</Text>
                </View>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            contentContainerStyle={{ paddingBottom: 80, paddingTop: 8 }}
          />
        )}
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
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    elevation: 1,
  },
  historyTitle: { fontWeight: '700', color: colors.dark },
  historySub: { color: '#666', fontSize: 12 },
  historyDuration: { fontWeight: '700', color: colors.primary },
});
