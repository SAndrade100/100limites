import React, { useMemo } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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

  // Calendar month state
  const today = new Date();
  const [calendarYear, setCalendarYear] = React.useState(today.getFullYear());
  const [calendarMonth, setCalendarMonth] = React.useState(today.getMonth());

  const trainedDays = React.useMemo(() => {
    // returns array of day numbers that have history entries in the month
    return new Set(sorted
      .filter((h) => {
        const d = new Date(h.date);
        return d.getFullYear() === calendarYear && d.getMonth() === calendarMonth;
      })
      .map((h) => new Date(h.date).getDate())
    );
  }, [sorted, calendarYear, calendarMonth]);

  const startOfMonth = new Date(calendarYear, calendarMonth, 1);
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const startWeekday = startOfMonth.getDay(); // 0 (Sun) - 6 (Sat)

  function prevMonth() {
    const d = new Date(calendarYear, calendarMonth - 1, 1);
    setCalendarYear(d.getFullYear());
    setCalendarMonth(d.getMonth());
  }

  function nextMonth() {
    const d = new Date(calendarYear, calendarMonth + 1, 1);
    setCalendarYear(d.getFullYear());
    setCalendarMonth(d.getMonth());
  }

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
          <>
            {/* Calendar */}
            <View style={{ marginBottom: 16 }}>
              <View style={styles.calendarHeader}>
                <TouchableOpacity onPress={prevMonth}>
                  <Text style={{ color: colors.primary }}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.calendarTitle}>{startOfMonth.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</Text>
                <TouchableOpacity onPress={nextMonth}>
                  <Text style={{ color: colors.primary }}>{'>'}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.calendarGrid}>
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d) => (
                  <View key={d} style={styles.calendarCellHeader}><Text style={styles.calendarCellHeaderText}>{d}</Text></View>
                ))}

                {/* empty cells for first week */}
                {Array.from({ length: startWeekday }).map((_, i) => (
                  <View key={'e' + i} style={styles.calendarCell} />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const trained = trainedDays.has(day);
                  return (
                    <View key={day} style={styles.calendarCell}>
                      <View style={[styles.calendarDay, trained && styles.calendarDayTrained]}>
                        <Text style={[styles.calendarDayText, trained && styles.calendarDayTextTrained]}>{day}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

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
          </>
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
  calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  calendarTitle: { fontWeight: '700', color: colors.dark },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  calendarCellHeader: { width: `${100 / 7}%`, alignItems: 'center', paddingVertical: 4 },
  calendarCellHeaderText: { color: '#6b6b6b', fontSize: 12 },
  calendarCell: { width: `${100 / 7}%`, alignItems: 'center', paddingVertical: 6 },
  calendarDay: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  calendarDayTrained: { backgroundColor: colors.primary },
  calendarDayText: { color: colors.dark },
  calendarDayTextTrained: { color: '#fff' },
});

