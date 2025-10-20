import { Workout } from '@/types/workout';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@workouts';

/**
 * Serviço para gerenciar o armazenamento local de treinos
 */
export const storageService = {
  /**
   * Retorna todos os treinos salvos
   */
  async getWorkouts(): Promise<Workout[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Erro ao buscar treinos:', error);
      return [];
    }
  },

  /**
   * Retorna um treino específico pelo ID
   */
  async getWorkoutById(id: string): Promise<Workout | null> {
    try {
      const workouts = await this.getWorkouts();
      return workouts.find(w => w.id === id) || null;
    } catch (error) {
      console.error('Erro ao buscar treino:', error);
      return null;
    }
  },

  /**
   * Salva um novo treino
   */
  async saveWorkout(workout: Workout): Promise<void> {
    try {
      const workouts = await this.getWorkouts();
      workouts.push(workout);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
    } catch (error) {
      console.error('Erro ao salvar treino:', error);
      throw error;
    }
  },

  /**
   * Atualiza um treino existente
   */
  async updateWorkout(id: string, updates: Partial<Workout>): Promise<void> {
    try {
      const workouts = await this.getWorkouts();
      const index = workouts.findIndex(w => w.id === id);
      
      if (index === -1) {
        throw new Error('Treino não encontrado');
      }

      workouts[index] = {
        ...workouts[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
    } catch (error) {
      console.error('Erro ao atualizar treino:', error);
      throw error;
    }
  },

  /**
   * Deleta um treino
   */
  async deleteWorkout(id: string): Promise<void> {
    try {
      const workouts = await this.getWorkouts();
      const filtered = workouts.filter(w => w.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Erro ao deletar treino:', error);
      throw error;
    }
  },

  /**
   * Limpa todos os treinos (útil para debug)
   */
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
      throw error;
    }
  },
};

