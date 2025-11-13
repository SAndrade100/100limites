import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Plan = {
  title: string;
  time: string;
  items: string[];
};

const FoodPlanCard = ({ plan }: { plan: Plan }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{plan.title}</Text>
          {plan.items.map((it, i) => (
            <Text key={i} style={styles.itemText} numberOfLines={1}>
              {it}
            </Text>
          ))}
        </View>
        <View style={styles.right}>
          <Text style={styles.time}>{plan.time}</Text>
          <TouchableOpacity style={styles.start} activeOpacity={0.85}>
            <Text style={styles.startText}>Iniciar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    elevation: 2,
  },
  row: { flexDirection: "row", alignItems: "center" },
  title: { fontWeight: "700", fontSize: 14, color: "#193923", marginBottom: 6 },
  itemText: { color: "#6b6b6b", fontSize: 12 },
  right: { alignItems: "flex-end", marginLeft: 12 },
  time: { color: "#9aa79a", marginBottom: 8 },
  start: {
    backgroundColor: "#87084E",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  startText: { color: "#fff", fontWeight: "700" },
});

export default FoodPlanCard;
