import Header from '@/components/Header';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data de histórico
const mockHistory = [
  { date: '2025-11-13', workouts: ['Treino A — Pernas'], duration: 45, exercises: 6 },
  { date: '2025-11-12', workouts: ['Treino B — Peito / Tríceps'], duration: 40, exercises: 6 },
  { date: '2025-11-11', workouts: ['Treino C — Costas / Bíceps'], duration: 42, exercises: 6 },
  { date: '2025-11-09', workouts: ['Treino A — Pernas'], duration: 48, exercises: 6 },
  { date: '2025-11-08', workouts: ['Treino B — Peito / Tríceps'], duration: 38, exercises: 6 },
  { date: '2025-11-06', workouts: ['Treino C — Costas / Bíceps'], duration: 44, exercises: 6 },
  { date: '2025-11-05', workouts: ['Treino A — Pernas'], duration: 46, exercises: 6 },
  { date: '2025-11-02', workouts: ['Treino B — Peito / Tríceps'], duration: 41, exercises: 6 },
  { date: '2025-10-30', workouts: ['Treino C — Costas / Bíceps'], duration: 43, exercises: 6 },
  { date: '2025-10-28', workouts: ['Treino A — Pernas'], duration: 47, exercises: 6 },
];

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export default function Historico() {
  const [currentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);

  // Filtra treinos do mês selecionado
  const workoutsInMonth = mockHistory.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate.getMonth() === selectedMonth && itemDate.getFullYear() === selectedYear;
  });

  // Calcula estatísticas
  const totalWorkouts = workoutsInMonth.length;
  const totalMinutes = workoutsInMonth.reduce((acc, item) => acc + item.duration, 0);
  const totalExercises = workoutsInMonth.reduce((acc, item) => acc + item.exercises, 0);
  const avgDuration = totalWorkouts > 0 ? Math.round(totalMinutes / totalWorkouts) : 0;

  // Treinos dos últimos 7 dias
  const last7Days = mockHistory.slice(0, 7);

  const hasWorkoutOnDay = (day: number) => {
    const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return workoutsInMonth.some(item => item.date === dateStr);
  };

  const changeMonth = (direction: number) => {
    let newMonth = selectedMonth + direction;
    let newYear = selectedYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const renderCalendar = () => {
    const days = [];
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    // Cabeçalho com dias da semana
    const header = dayNames.map((name, index) => (
      <View key={`header-${index}`} style={styles.dayHeader}>
        <Text style={styles.dayHeaderText}>{name}</Text>
      </View>
    ));

    // Dias vazios antes do primeiro dia
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const hasWorkout = hasWorkoutOnDay(day);
      const isToday = day === currentDate.getDate() && 
                      selectedMonth === currentDate.getMonth() && 
                      selectedYear === currentDate.getFullYear();

      days.push(
        <View key={`day-${day}`} style={styles.dayCell}>
          <TouchableOpacity 
            style={[
              styles.dayCircle,
              hasWorkout && styles.dayWithWorkout,
              isToday && styles.dayToday,
            ]}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.dayText,
              hasWorkout && styles.dayTextWithWorkout,
              isToday && styles.dayTextToday,
            ]}>
              {day}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.calendar}>
        <View style={styles.calendarGrid}>{header}</View>
        <View style={styles.calendarGrid}>{days}</View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <Header name="Histórico" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Estatísticas do mês */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="dumbbell" size={24} color="#87084E" />
            <Text style={styles.statNumber}>{totalWorkouts}</Text>
            <Text style={styles.statLabel}>Treinos</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="clock-outline" size={24} color="#87084E" />
            <Text style={styles.statNumber}>{totalMinutes}min</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="chart-line" size={24} color="#87084E" />
            <Text style={styles.statNumber}>{avgDuration}min</Text>
            <Text style={styles.statLabel}>Média</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="weight-lifter" size={24} color="#87084E" />
            <Text style={styles.statNumber}>{totalExercises}</Text>
            <Text style={styles.statLabel}>Exercícios</Text>
          </View>
        </View>

        {/* Navegação do calendário */}
        <View style={styles.monthSelector}>
          <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.monthButton}>
            <MaterialCommunityIcons name="chevron-left" size={28} color="#87084E" />
          </TouchableOpacity>
          <Text style={styles.monthTitle}>
            {monthNames[selectedMonth]} {selectedYear}
          </Text>
          <TouchableOpacity onPress={() => changeMonth(1)} style={styles.monthButton}>
            <MaterialCommunityIcons name="chevron-right" size={28} color="#87084E" />
          </TouchableOpacity>
        </View>

        {/* Calendário */}
        {renderCalendar()}

        {/* Legenda */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#87084E' }]} />
            <Text style={styles.legendText}>Dia com treino</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#B74978' }]} />
            <Text style={styles.legendText}>Hoje</Text>
          </View>
        </View>

        {/* Últimos treinos */}
        <Text style={styles.sectionTitle}>Treinos Recentes</Text>
        {last7Days.map((item, index) => {
          const date = new Date(item.date);
          const dayOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][date.getDay()];
          const day = date.getDate();
          const month = monthNames[date.getMonth()];

          return (
            <View key={index} style={styles.workoutCard}>
              <View style={styles.workoutDate}>
                <Text style={styles.workoutDay}>{day}</Text>
                <View>
                  <Text style={styles.workoutMonth}>{month}</Text>
                  <Text style={styles.workoutWeekday}>{dayOfWeek}</Text>
                </View>
              </View>
              <View style={styles.workoutInfo}>
                {item.workouts.map((workout, i) => (
                  <Text key={i} style={styles.workoutTitle}>{workout}</Text>
                ))}
                <View style={styles.workoutMeta}>
                  <View style={styles.metaItem}>
                    <MaterialCommunityIcons name="clock-outline" size={14} color="#6b6b6b" />
                    <Text style={styles.metaText}>{item.duration} min</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <MaterialCommunityIcons name="dumbbell" size={14} color="#6b6b6b" />
                    <Text style={styles.metaText}>{item.exercises} exercícios</Text>
                  </View>
                </View>
              </View>
              <MaterialCommunityIcons name="check-circle" size={24} color="#87084E" />
            </View>
          );
        })}

        {/* Relatório de progresso */}
        <Text style={styles.sectionTitle}>Progresso Mensal</Text>
        <View style={styles.progressCard}>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Consistência</Text>
            <Text style={styles.progressValue}>{Math.round((totalWorkouts / daysInMonth) * 100)}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(totalWorkouts / daysInMonth) * 100}%` }]} />
          </View>
          
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Meta semanal (3x)</Text>
            <Text style={styles.progressValue}>{Math.round(totalWorkouts / 4)}/3</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.min((totalWorkouts / 12) * 100, 100)}%` }]} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF5F8' },
  container: { padding: 16, paddingBottom: 40 },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
  },
  statNumber: { fontSize: 18, fontWeight: '700', color: '#3A1224', marginTop: 6 },
  statLabel: { fontSize: 11, color: '#6b6b6b', marginTop: 2 },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    elevation: 2,
  },
  monthButton: { padding: 4 },
  monthTitle: { fontSize: 18, fontWeight: '700', color: '#3A1224' },
  calendar: { backgroundColor: '#fff', borderRadius: 12, padding: 12, elevation: 2, marginBottom: 16 },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayHeader: { width: '14.28%', alignItems: 'center', paddingVertical: 8 },
  dayHeaderText: { fontSize: 12, fontWeight: '600', color: '#6b6b6b' },
  dayCell: { 
    width: '14.28%', 
    height: 44,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  dayWithWorkout: { backgroundColor: '#87084E' },
  dayToday: { backgroundColor: '#B74978', borderWidth: 2, borderColor: '#87084E' },
  dayText: { fontSize: 12, color: '#3A1224' },
  dayTextWithWorkout: { color: '#fff', fontWeight: '700' },
  dayTextToday: { color: '#fff', fontWeight: '700' },
  legend: { flexDirection: 'row', justifyContent: 'center', gap: 24, marginBottom: 24 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 12, height: 12, borderRadius: 6 },
  legendText: { fontSize: 12, color: '#6b6b6b' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#3A1224', marginBottom: 12 },
  workoutCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  workoutDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  workoutDay: { fontSize: 32, fontWeight: '700', color: '#87084E' },
  workoutMonth: { fontSize: 12, color: '#6b6b6b', fontWeight: '600' },
  workoutWeekday: { fontSize: 11, color: '#9b9b9b' },
  workoutInfo: { flex: 1 },
  workoutTitle: { fontSize: 15, fontWeight: '600', color: '#3A1224', marginBottom: 6 },
  workoutMeta: { flexDirection: 'row', gap: 16 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, color: '#6b6b6b' },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    marginBottom: 24,
  },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { fontSize: 14, color: '#3A1224', fontWeight: '600' },
  progressValue: { fontSize: 14, color: '#87084E', fontWeight: '700' },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressFill: { height: '100%', backgroundColor: '#87084E', borderRadius: 4 },
});
