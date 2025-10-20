import { sampleWorkouts } from './sampleData';
import { storageService } from './storageService';

export const initializeDataIfNeeded = async (): Promise<void> => {
  try {
    const workouts = await storageService.getWorkouts();
    
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

