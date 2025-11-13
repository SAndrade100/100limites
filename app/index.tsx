import FoodPlanCard from "@/components/FoodPlanCard";
import Header from "@/components/Header";
import QuickAccess from "@/components/QuickAccess";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const mockWorkout = {
  title: "Treino A — Pernas",
  time: "10:00",
  items: [
    "Agachamento — 4x10",
    "Leg press — 3x12",
    "Stiff — 3x10",
  ],
};

export default function Index() {
  return (
    <SafeAreaView style={styles.safe}>
      <Header name="Beatriz Honorato Pereira" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acesso rápido</Text>
          <QuickAccess />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximo treino</Text>
          <FoodPlanCard plan={mockWorkout} />
        </View>

        <View style={styles.scheduleWrap}>
          <Text style={styles.scheduleText}>Agendar uma consulta</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Atualizações do seu diário</Text>
          <View style={styles.placeholderBox}>
            <Text style={{ color: colors.dark }}>Nenhuma atualização por enquanto</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const colors = {
  primary: "#87084E", // deep magenta
  dusty: "#D4C4CA", // soft pink
  light: "#FFF5F8", // very light pink background
  accent: "#B74978",
  dark: "#3A1224",
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.light },
  container: { padding: 16, paddingBottom: 48 },
  section: { marginTop: 16 },
  sectionTitle: { fontSize: 16, fontWeight: "600", color: colors.dark, marginBottom: 8 },
  scheduleWrap: {
    marginTop: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  scheduleText: { color: colors.dark, fontWeight: "600" },
  placeholderBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
});

