import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomModal from '../components/CustomModal';
import Header from '../components/Header';

export default function PerfilScreen() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    console.log('Usuário deslogado');
    setShowLogoutModal(false);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <Header name="Perfil" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.userCard}>
          <Image
            source={require('../../assets/images/user.jpg')}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Beatriz Honorato Pereira</Text>
          <Text style={styles.userEmail}>beatriz@example.com</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>45</Text>
              <Text style={styles.statLabel}>treinos</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>semanas</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>78%</Text>
              <Text style={styles.statLabel}>consistência</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          <MenuItem icon="account" label="Dados Pessoais" />
          <MenuItem icon="target" label="Metas" />
          <MenuItem icon="heart-pulse" label="Saúde" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferências</Text>
          <MenuItem icon="bell" label="Notificações" />
          <MenuItem icon="palette" label="Aparência" />
          <MenuItem icon="clock" label="Horários" />
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setShowLogoutModal(true)}
        >
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>

      <CustomModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Sair"
        message="Tem certeza que deseja sair?"
        icon="logout"
        iconColor="#d32f2f"
        primaryButton={{
          text: "Sair",
          onPress: handleLogout,
          color: "#d32f2f",
        }}
        secondaryButton={{
          text: "Cancelar",
          onPress: () => setShowLogoutModal(false),
        }}
      />
    </SafeAreaView>
  );
}

function MenuItem({ icon, label }: { icon: string; label: string }) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <MaterialCommunityIcons name={icon as any} size={22} color="#87084E" />
      <Text style={styles.menuLabel}>{label}</Text>
      <MaterialIcons name="chevron-right" size={24} color="#ccc" />
    </TouchableOpacity>
  );
}

const colors = {
  primary: '#87084E',
  light: '#FFF5F8',
  dark: '#3A1224',
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.light },
  container: { padding: 16, paddingBottom: 40 },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.primary,
    marginBottom: 12,
  },
  userName: { fontSize: 20, fontWeight: '700', color: colors.dark },
  userEmail: { fontSize: 14, color: '#6b6b6b', marginBottom: 16 },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: 20, fontWeight: '700', color: colors.primary },
  statLabel: { fontSize: 12, color: '#6b6b6b', marginTop: 4 },
  statDivider: { width: 1, backgroundColor: '#f0f0f0' },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#888', marginBottom: 8, textTransform: 'uppercase' },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    elevation: 1,
  },
  menuLabel: { flex: 1, fontSize: 16, color: colors.dark, marginLeft: 12 },
  logoutButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    elevation: 2,
  },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
