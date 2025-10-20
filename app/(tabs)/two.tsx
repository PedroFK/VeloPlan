import { Card } from '@/components/ui/Card';
import { useTheme } from '@/contexts/ThemeContext';
import { useWorkouts } from '@/hooks/useWorkouts';
import { BarChart3, Clock, Dumbbell } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function StatisticsScreen() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { workouts } = useWorkouts();

  const totalWorkouts = workouts.length;
  const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);
  const avgDuration = totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0;

  const workoutsByType = {
    'força': workouts.filter(w => w.type === 'força').length,
    'resistência': workouts.filter(w => w.type === 'resistência').length,
    'cardio': workouts.filter(w => w.type === 'cardio').length,
  };

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
          Estatísticas
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: isDark ? '#94a3b8' : '#64748b' },
          ]}
        >
          Acompanhe seu progresso
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <Dumbbell size={32} color="#3b82f6" />
            <Text
              style={[
                styles.statValue,
                { color: isDark ? '#ffffff' : '#0f172a' },
              ]}
            >
              {totalWorkouts}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: isDark ? '#94a3b8' : '#64748b' },
              ]}
            >
              Total de Treinos
            </Text>
          </Card>

          <Card style={styles.statCard}>
            <Clock size={32} color="#f97316" />
            <Text
              style={[
                styles.statValue,
                { color: isDark ? '#ffffff' : '#0f172a' },
              ]}
            >
              {totalDuration}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: isDark ? '#94a3b8' : '#64748b' },
              ]}
            >
              Minutos Totais
            </Text>
          </Card>
        </View>

        <Card style={styles.statCard}>
          <BarChart3 size={32} color="#10b981" />
          <Text
            style={[
              styles.statValue,
              { color: isDark ? '#ffffff' : '#0f172a' },
            ]}
          >
            {avgDuration}
          </Text>
          <Text
            style={[
              styles.statLabel,
              { color: isDark ? '#94a3b8' : '#64748b' },
            ]}
          >
            Duração Média (min)
          </Text>
        </Card>

        <Card style={styles.typeCard}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? '#e2e8f0' : '#334155' },
            ]}
          >
            Treinos por Tipo
          </Text>
          <View style={styles.typeList}>
            {Object.entries(workoutsByType).map(([type, count]) => (
              <View key={type} style={styles.typeItem}>
                <Text
                  style={[
                    styles.typeName,
                    { color: isDark ? '#e2e8f0' : '#334155' },
                  ]}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
                <View style={styles.typeRight}>
                  <View
                    style={[
                      styles.typeBar,
                      {
                        width: totalWorkouts > 0 ? `${(count / totalWorkouts) * 100}%` : '0%',
                        backgroundColor:
                          type === 'força'
                            ? '#ef4444'
                            : type === 'resistência'
                            ? '#3b82f6'
                            : '#f97316',
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.typeCount,
                      { color: isDark ? '#94a3b8' : '#64748b' },
                    ]}
                  >
                    {count}
                  </Text>
                </View>
              </View>
            ))}
          </View>
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
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 24,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 12,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  typeCard: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  typeList: {
    gap: 16,
  },
  typeItem: {
    gap: 8,
  },
  typeName: {
    fontSize: 14,
    fontWeight: '600',
  },
  typeRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  typeBar: {
    height: 8,
    borderRadius: 4,
    minWidth: 8,
  },
  typeCount: {
    fontSize: 14,
    fontWeight: '600',
    minWidth: 24,
  },
});
