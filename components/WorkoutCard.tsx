import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Workout = {
  id: string;
  title: string;
  time?: string;
  items: string[];
};

const WorkoutCard = ({ workout, onPress }: { workout: Workout; onPress?: () => void }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{workout.title}</Text>
          {workout.items.map((it, i) => (
            <Text key={i} style={styles.itemText} numberOfLines={1}>
              {it}
            </Text>
          ))}
        </View>
        <View style={styles.right}>
          {workout.time ? <Text style={styles.time}>{workout.time}</Text> : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    marginBottom: 12,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  title: { fontWeight: '700', fontSize: 16, color: '#3A1224', marginBottom: 6 },
  itemText: { color: '#6b6b6b', fontSize: 12 },
  right: { alignItems: 'flex-end', marginLeft: 12 },
  time: { color: '#9a5a78', fontWeight: '600' },
});

export default WorkoutCard;
