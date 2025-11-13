import CustomModal from '@/components/CustomModal';
import Header from '@/components/Header';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Perfil() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(false);
    // Aqui você implementaria a lógica de logout
    console.log('Usuário deslogado');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <Header name="Perfil" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Card do usuário */}
        <View style={styles.userCard}>
          <Image
            source={require('../assets/images/user.jpg')}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Beatriz Honorato Pereira</Text>
          <Text style={styles.userEmail}>beatriz.hp@email.com</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>45</Text>
              <Text style={styles.statLabel}>Treinos</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Semanas</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>78%</Text>
              <Text style={styles.statLabel}>Consistência</Text>
            </View>
          </View>
        </View>

        {/* Informações Pessoais */}
        <Text style={styles.sectionTitle}>Informações Pessoais</Text>
        <View style={styles.section}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <MaterialCommunityIcons name="account-outline" size={24} color="#87084E" />
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>Dados Pessoais</Text>
                <Text style={styles.menuSubtitle}>Nome, idade, altura, peso</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9b9b9b" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <MaterialCommunityIcons name="target" size={24} color="#87084E" />
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>Metas</Text>
                <Text style={styles.menuSubtitle}>Objetivos e metas de treino</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9b9b9b" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <MaterialCommunityIcons name="heart-pulse" size={24} color="#87084E" />
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>Saúde</Text>
                <Text style={styles.menuSubtitle}>Histórico de saúde e lesões</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9b9b9b" />
          </TouchableOpacity>
        </View>

        {/* Preferências */}
        <Text style={styles.sectionTitle}>Preferências</Text>
        <View style={styles.section}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <MaterialCommunityIcons name="bell-outline" size={24} color="#87084E" />
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>Notificações</Text>
                <Text style={styles.menuSubtitle}>Lembretes e alertas</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9b9b9b" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <MaterialCommunityIcons name="palette-outline" size={24} color="#87084E" />
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>Aparência</Text>
                <Text style={styles.menuSubtitle}>Tema e personalização</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9b9b9b" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <MaterialCommunityIcons name="calendar-clock" size={24} color="#87084E" />
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>Horários</Text>
                <Text style={styles.menuSubtitle}>Horários preferenciais de treino</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9b9b9b" />
          </TouchableOpacity>
        </View>

        {/* Suporte */}
        <Text style={styles.sectionTitle}>Suporte</Text>
        <View style={styles.section}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <MaterialCommunityIcons name="help-circle-outline" size={24} color="#87084E" />
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>Ajuda</Text>
                <Text style={styles.menuSubtitle}>Central de ajuda e FAQ</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9b9b9b" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <MaterialCommunityIcons name="shield-check-outline" size={24} color="#87084E" />
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>Privacidade</Text>
                <Text style={styles.menuSubtitle}>Política de privacidade</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9b9b9b" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <MaterialCommunityIcons name="information-outline" size={24} color="#87084E" />
              <View style={styles.menuText}>
                <Text style={styles.menuTitle}>Sobre</Text>
                <Text style={styles.menuSubtitle}>Versão 1.0.0</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9b9b9b" />
          </TouchableOpacity>
        </View>

        {/* Botão de Logout */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => setShowLogoutModal(true)}
        >
          <MaterialCommunityIcons name="logout" size={20} color="#fff" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>

        <Text style={styles.version}>100 Limites v1.0.0</Text>
      </ScrollView>

      <CustomModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Sair da Conta"
        message="Tem certeza que deseja sair da sua conta?"
        icon="logout"
        iconColor="#87084E"
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

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF5F8' },
  container: { padding: 16, paddingBottom: 40 },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 2,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#87084E',
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#3A1224',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6b6b6b',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#87084E',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b6b6b',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3A1224',
    marginBottom: 12,
    marginTop: 8,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3A1224',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#6b6b6b',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 52,
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9b9b9b',
    marginTop: 8,
  },
});
