import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const items = [
  { key: "workouts", label: "Treinos", icon: <MaterialCommunityIcons name="dumbbell" size={20} color="#87084E" /> },
  { key: "plans", label: "Planos", icon: <MaterialCommunityIcons name="calendar-check" size={20} color="#87084E" /> },
  { key: "history", label: "Histórico", icon: <MaterialCommunityIcons name="history" size={20} color="#87084E" /> },
  { key: "profile", label: "Perfil", icon: <MaterialIcons name="person" size={20} color="#87084E" /> },
];

const QuickAccess = () => {
  return (
    <View style={styles.row}>
      {items.map((it) => (
        <View key={it.key} style={styles.itemWrap}>
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            {it.icon}
          </TouchableOpacity>
          <Text style={styles.label}>{it.label}</Text>
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
});

export default QuickAccess;
