import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const items = [
  { key: "workouts", label: "Treinos", icon: <MaterialCommunityIcons name="dumbbell" size={20} color="#87084E" /> },
  { key: "plans", label: "Planos", icon: <MaterialCommunityIcons name="calendar-check" size={20} color="#87084E" /> },
  { key: "history", label: "Histórico", icon: <MaterialCommunityIcons name="history" size={20} color="#87084E" /> },
  { key: "profile", label: "Perfil", icon: <MaterialIcons name="person" size={20} color="#87084E" /> },
];

const QuickAccess = () => {
  const router = useRouter();

  function handlePress(key: string) {
    console.log('QuickAccess pressed', key);
    if (key === 'workouts') {
      // use string path push; cast to any to satisfy types
      router.push('/treinos' as any);
      return;
    }
    // placeholder for other actions
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
