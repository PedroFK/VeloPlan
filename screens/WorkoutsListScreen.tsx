import { WorkoutCard } from '@/components/WorkoutCard';
import { useTheme } from '@/contexts/ThemeContext';
import { useWorkouts } from '@/hooks/useWorkouts';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function WorkoutsListScreen() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { workouts, loading, deleteWorkout, loadWorkouts } = useWorkouts();
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const onRefresh = async () => {
    setRefreshing(true);
    await loadWorkouts();
    setRefreshing(false);
  };

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      'Excluir Treino',
      `Tem certeza que deseja excluir "${name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteWorkout(id);
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o treino');
            }
          },
        },
      ]
    );
  };

  const handleEdit = (id: string) => {
    router.push(`/workout/edit/${id}`);
  };

  const handlePress = (id: string) => {
    router.push(`/workout/${id}`);
  };

  const handleAdd = () => {
    router.push('/workout/new');
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
          Meus Treinos
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: isDark ? '#94a3b8' : '#64748b' },
          ]}
        >
          {workouts.length} {workouts.length === 1 ? 'treino' : 'treinos'} cadastrado{workouts.length === 1 ? '' : 's'}
        </Text>
      </View>

      {workouts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text
            style={[
              styles.emptyText,
              { color: isDark ? '#94a3b8' : '#64748b' },
            ]}
          >
            Nenhum treino cadastrado ainda.
          </Text>
          <Text
            style={[
              styles.emptySubtext,
              { color: isDark ? '#64748b' : '#94a3b8' },
            ]}
          >
            Comece adicionando seu primeiro treino!
          </Text>
        </View>
      ) : (
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <WorkoutCard
              workout={item}
              onPress={() => handlePress(item.id)}
              onEdit={() => handleEdit(item.id)}
              onDelete={() => handleDelete(item.id, item.name)}
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={isDark ? '#ffffff' : '#0f172a'}
            />
          }
        />
      )}

      {/* Botão Flutuante */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleAdd}
        activeOpacity={0.8}
      >
        <Plus size={28} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

