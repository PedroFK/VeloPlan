import { storageService } from '@/services/storageService';
import { Workout } from '@/types/workout';
import { useCallback, useEffect, useState } from 'react';

/**
 * Hook para gerenciar estado e operações de treinos
 */
export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWorkouts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await storageService.getWorkouts();
      setWorkouts(data);
    } catch (err) {
      setError('Erro ao carregar treinos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

  const addWorkout = async (workout: Workout) => {
    try {
      await storageService.saveWorkout(workout);
      await loadWorkouts();
    } catch (err) {
      setError('Erro ao adicionar treino');
      throw err;
    }
  };

  const updateWorkout = async (id: string, updates: Partial<Workout>) => {
    try {
      await storageService.updateWorkout(id, updates);
      await loadWorkouts();
    } catch (err) {
      setError('Erro ao atualizar treino');
      throw err;
    }
  };

  const deleteWorkout = async (id: string) => {
    try {
      await storageService.deleteWorkout(id);
      await loadWorkouts();
    } catch (err) {
      setError('Erro ao deletar treino');
      throw err;
    }
  };

  return {
    workouts,
    loading,
    error,
    loadWorkouts,
    addWorkout,
    updateWorkout,
    deleteWorkout,
  };
};

