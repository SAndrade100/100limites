import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const items = [
  { key: "workouts", label: "Treinos", icon: <MaterialCommunityIcons name="dumbbell" size={20} color="#87084E" /> },
  { key: "exercises", label: "Exercícios", icon: <MaterialCommunityIcons name="weight-lifter" size={20} color="#87084E" /> },
  { key: "plans", label: "Planos", icon: <MaterialCommunityIcons name="calendar-check" size={20} color="#87084E" /> },
  { key: "history", label: "Histórico", icon: <MaterialCommunityIcons name="history" size={20} color="#87084E" /> },
];

const QuickAccess = () => {
  const navigation = useNavigation<any>();

  function handlePress(key: string) {
    console.log('QuickAccess pressed', key);
    if (key === 'workouts') {
      navigation.navigate('Treinos');
      return;
    }
      if (key === 'exercises') {
        navigation.navigate('Exercises');
        return;
      }
    if (key === 'plans') {
      navigation.navigate('Planos');
      return;
    }
    if (key === 'history') {
      navigation.navigate('Historico');
      return;
    }
    console.log('pressed', key);
  }

  return (
    <View style={styles.row}>
      {items.map((it) => (
        <View key={it.key} style={styles.itemWrap}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => handlePress(it.key)}
            accessibilityRole="button"
            accessibilityLabel={it.label}
            accessibilityHint={`Abrir ${it.label}`}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {it.icon}
            <Text style={styles.labelInside}>{it.label}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between" },
  itemWrap: { alignItems: "center", flex: 1 },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  label: { marginTop: 8, fontSize: 12, color: "#87084E" },
  labelInside: { marginTop: 8, fontSize: 12, color: "#87084E" },
});

export default QuickAccess;
