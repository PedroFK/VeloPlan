import { Card } from '@/components/ui/Card';
import { useColorScheme } from '@/components/useColorScheme';
import { WorkoutChart } from '@/components/WorkoutChart';
import { storageService } from '@/services/storageService';
import { Workout } from '@/types/workout';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar, Clock, Edit, Trash2 } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function WorkoutDetailScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof id === 'string') {
      loadWorkout(id);
    }
  }, [id]);

  const loadWorkout = async (workoutId: string) => {
    try {
      setLoading(true);
      const data = await storageService.getWorkoutById(workoutId);
      setWorkout(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o treino');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    if (workout) {
      router.push(`/workout/edit/${workout.id}`);
    }
  };

  const handleDelete = () => {
    if (!workout) return;

    Alert.alert(
      'Excluir Treino',
      `Tem certeza que deseja excluir "${workout.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await storageService.deleteWorkout(workout.id);
              Alert.alert('Sucesso', 'Treino excluído com sucesso!');
              router.back();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o treino');
            }
          },
        },
      ]
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'força':
        return '#ef4444';
      case 'resistência':
        return '#3b82f6';
      case 'cardio':
        return '#f97316';
      default:
        return '#64748b';
    }
  };

  if (loading || !workout) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: isDark ? '#0f172a' : '#f8fafc',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <Text style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
          Carregando...
        </Text>
      </View>
    );
  }

  const formattedDate = new Date(workout.createdAt).toLocaleDateString('pt-BR');

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#0f172a' : '#f8fafc' },
      ]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Text
              style={[
                styles.title,
                { color: isDark ? '#ffffff' : '#0f172a' },
              ]}
            >
              {workout.name}
            </Text>
            <View
              style={[
                styles.typeBadge,
                { backgroundColor: getTypeColor(workout.type) + '20' },
              ]}
            >
              <Text
                style={[
                  styles.typeBadgeText,
                  { color: getTypeColor(workout.type) },
                ]}
              >
                {workout.type}
              </Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={handleEdit}
              style={styles.iconButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Edit size={24} color={isDark ? '#94a3b8' : '#64748b'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              style={styles.iconButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Trash2 size={24} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.infoCards}>
        <Card style={styles.infoCard}>
          <Clock size={20} color={isDark ? '#94a3b8' : '#64748b'} />
          <Text
            style={[
              styles.infoValue,
              { color: isDark ? '#ffffff' : '#0f172a' },
            ]}
          >
            {workout.duration} min
          </Text>
          <Text
            style={[
              styles.infoLabel,
              { color: isDark ? '#94a3b8' : '#64748b' },
            ]}
          >
            Duração
          </Text>
        </Card>

        <Card style={styles.infoCard}>
          <Calendar size={20} color={isDark ? '#94a3b8' : '#64748b'} />
          <Text
            style={[
              styles.infoValue,
              { color: isDark ? '#ffffff' : '#0f172a' },
            ]}
          >
            {formattedDate}
          </Text>
          <Text
            style={[
              styles.infoLabel,
              { color: isDark ? '#94a3b8' : '#64748b' },
            ]}
          >
            Criado em
          </Text>
        </Card>
      </View>

      {workout.description && (
        <Card style={styles.descriptionCard}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? '#e2e8f0' : '#334155' },
            ]}
          >
            Descrição
          </Text>
          <Text
            style={[
              styles.description,
              { color: isDark ? '#94a3b8' : '#64748b' },
            ]}
          >
            {workout.description}
          </Text>
        </Card>
      )}

      <Card style={styles.structureCard}>
        <Text
          style={[
            styles.sectionTitle,
            { color: isDark ? '#e2e8f0' : '#334155' },
          ]}
        >
          Estrutura
        </Text>
        <Text
          style={[
            styles.structure,
            { color: isDark ? '#ffffff' : '#0f172a' },
          ]}
        >
          {workout.structure}
        </Text>
      </Card>

      <Card>
        <WorkoutChart intervals={workout.intervals} />
      </Card>

      {workout.intervals.length > 0 && (
        <Card style={styles.intervalsCard}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? '#e2e8f0' : '#334155' },
            ]}
          >
            Intervalos
          </Text>
          {workout.intervals.map((interval, index) => (
            <View
              key={index}
              style={[
                styles.intervalItem,
                {
                  borderBottomColor: isDark ? '#334155' : '#e2e8f0',
                  borderBottomWidth:
                    index < workout.intervals.length - 1 ? 1 : 0,
                },
              ]}
            >
              <View style={styles.intervalLeft}>
                <Text
                  style={[
                    styles.intervalNumber,
                    { color: isDark ? '#64748b' : '#94a3b8' },
                  ]}
                >
                  #{index + 1}
                </Text>
                <Text
                  style={[
                    styles.intervalDesc,
                    { color: isDark ? '#e2e8f0' : '#334155' },
                  ]}
                >
                  {interval.description || `${interval.duration}m Z${interval.intensity}`}
                </Text>
              </View>
              <View
                style={[
                  styles.intensityBadge,
                  {
                    backgroundColor:
                      interval.intensity >= 4 ? '#ef444420' : '#3b82f620',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.intensityText,
                    {
                      color: interval.intensity >= 4 ? '#ef4444' : '#3b82f6',
                    },
                  ]}
                >
                  Z{interval.intensity}
                </Text>
              </View>
            </View>
          ))}
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  typeBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  infoCards: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 16,
  },
  infoCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  infoValue: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 8,
  },
  infoLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  descriptionCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  structureCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  structure: {
    fontSize: 16,
    fontWeight: '600',
  },
  intervalsCard: {
    marginHorizontal: 20,
    marginTop: 16,
  },
  intervalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  intervalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  intervalNumber: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 12,
    width: 30,
  },
  intervalDesc: {
    fontSize: 14,
    flex: 1,
  },
  intensityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  intensityText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

