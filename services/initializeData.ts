import { sampleWorkouts } from './sampleData';
import { storageService } from './storageService';

/**
 * Inicializa o app com dados de exemplo se não houver treinos salvos
 */
export const initializeDataIfNeeded = async (): Promise<void> => {
  try {
    const workouts = await storageService.getWorkouts();
    
    // Se não há treinos, adiciona dados de exemplo
    if (workouts.length === 0) {
      console.log('Inicializando app com dados de exemplo...');
      
      for (const workout of sampleWorkouts) {
        await storageService.saveWorkout(workout);
      }
      
      console.log('Dados de exemplo adicionados com sucesso!');
    }
  } catch (error) {
    console.error('Erro ao inicializar dados:', error);
  }
};

