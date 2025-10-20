import { Workout } from '@/types/workout';
import { Edit, Trash2 } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MiniChart } from './MiniChart';
import { Card } from './ui/Card';
import { useColorScheme } from './useColorScheme';

interface WorkoutCardProps {
  workout: Workout;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({
  workout,
  onPress,
  onEdit,
  onDelete,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

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

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text
              style={[
                styles.title,
                { color: isDark ? '#ffffff' : '#0f172a' },
              ]}
            >
              {workout.name}
            </Text>
            <View style={styles.badges}>
              <View
                style={[
                  styles.badge,
                  { backgroundColor: getTypeColor(workout.type) + '20' },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    { color: getTypeColor(workout.type) },
                  ]}
                >
                  {workout.type}
                </Text>
              </View>
              <Text
                style={[
                  styles.duration,
                  { color: isDark ? '#94a3b8' : '#64748b' },
                ]}
              >
                {workout.duration} min
              </Text>
            </View>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={onEdit}
              style={styles.iconButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Edit
                size={20}
                color={isDark ? '#94a3b8' : '#64748b'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onDelete}
              style={styles.iconButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Trash2 size={20} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>

        {workout.description && (
          <Text
            style={[
              styles.description,
              { color: isDark ? '#94a3b8' : '#64748b' },
            ]}
            numberOfLines={2}
          >
            {workout.description}
          </Text>
        )}

        <View style={styles.chartContainer}>
          <MiniChart intervals={workout.intervals} />
        </View>

        <Text
          style={[
            styles.structure,
            { color: isDark ? '#64748b' : '#94a3b8' },
          ]}
        >
          {workout.structure}
        </Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  duration: {
    fontSize: 12,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  chartContainer: {
    height: 60,
    marginBottom: 8,
  },
  structure: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});

