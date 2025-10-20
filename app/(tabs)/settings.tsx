import { ThemeToggle } from '@/components/ThemeToggle';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/contexts/ThemeContext';
import { Settings as SettingsIcon } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#0f172a' : '#f8fafc' },
      ]}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: isDark ? '#ffffff' : '#0f172a' },
          ]}
        >
          Configurações
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: isDark ? '#94a3b8' : '#64748b' },
          ]}
        >
          Personalize seu app
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <SettingsIcon
              size={20}
              color={isDark ? '#94a3b8' : '#64748b'}
            />
            <Text
              style={[
                styles.sectionTitle,
                { color: isDark ? '#e2e8f0' : '#334155' },
              ]}
            >
              Aparência
            </Text>
          </View>
          <ThemeToggle />
        </Card>

        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text
              style={[
                styles.sectionTitle,
                { color: isDark ? '#e2e8f0' : '#334155' },
              ]}
            >
              Sobre o App
            </Text>
          </View>
          <Text
            style={[
              styles.infoText,
              { color: isDark ? '#94a3b8' : '#64748b' },
            ]}
          >
            VeloPlan v1.0.0
          </Text>
          <Text
            style={[
              styles.infoText,
              { color: isDark ? '#94a3b8' : '#64748b' },
            ]}
          >
            Aplicativo para planejamento e acompanhamento de treinos
          </Text>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 16,
  },
  section: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});


