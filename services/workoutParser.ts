import { WorkoutInterval } from '@/types/workout';

/**
 * Parse de estrutura de treino em formato texto para intervalos
 * Exemplo: "3x(1m z5 / 2m z2)" -> array de intervalos
 */
export const parseWorkoutStructure = (structure: string): WorkoutInterval[] => {
  const intervals: WorkoutInterval[] = [];
  
  try {
    // Remove espaços extras
    const cleaned = structure.trim().toLowerCase();
    
    // Detecta padrão de repetição: Nx(...)
    const repeatMatch = cleaned.match(/^(\d+)x\((.*)\)$/);
    
    if (repeatMatch) {
      const repeats = parseInt(repeatMatch[1]);
      const content = repeatMatch[2];
      
      // Divide por "/" para obter cada intervalo
      const parts = content.split('/').map(p => p.trim());
      
      for (let i = 0; i < repeats; i++) {
        parts.forEach(part => {
          const interval = parseSingleInterval(part);
          if (interval) intervals.push(interval);
        });
      }
    } else {
      // Sem repetição, apenas intervalos separados por "/"
      const parts = cleaned.split('/').map(p => p.trim());
      parts.forEach(part => {
        const interval = parseSingleInterval(part);
        if (interval) intervals.push(interval);
      });
    }
  } catch (error) {
    console.error('Erro ao fazer parse da estrutura:', error);
  }
  
  return intervals;
};

/**
 * Parse de um intervalo individual
 * Exemplo: "1m z5" -> {duration: 1, intensity: 5}
 * Exemplo: "30s z5" -> {duration: 0.5, intensity: 5}
 */
const parseSingleInterval = (text: string): WorkoutInterval | null => {
  try {
    // Padrão para minutos: Xm zY ou X min zY
    const matchMin = text.match(/(\d+(?:\.\d+)?)\s*(?:m|min)\s*z(\d)/);
    if (matchMin) {
      return {
        duration: parseFloat(matchMin[1]),
        intensity: parseInt(matchMin[2]),
        description: text,
      };
    }
    
    // Padrão para segundos: Xs zY ou X sec zY ou X s zY
    const matchSec = text.match(/(\d+(?:\.\d+)?)\s*(?:s|sec|seg)\s*z(\d)/);
    if (matchSec) {
      return {
        duration: parseFloat(matchSec[1]) / 60, // Converte segundos para minutos
        intensity: parseInt(matchSec[2]),
        description: text,
      };
    }
    
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Gera dados de exemplo para o gráfico baseado nos intervalos
 */
export const generateChartData = (intervals: WorkoutInterval[]) => {
  const data: { x: number; y: number }[] = [];
  let currentTime = 0;
  
  intervals.forEach((interval) => {
    // Adiciona ponto inicial do intervalo
    data.push({ x: currentTime, y: interval.intensity });
    
    // Adiciona ponto final do intervalo
    currentTime += interval.duration;
    data.push({ x: currentTime, y: interval.intensity });
  });
  
  return data;
};

/**
 * Valida se a estrutura do treino está em formato válido
 */
export const validateWorkoutStructure = (structure: string): boolean => {
  if (!structure.trim()) return false;
  
  const intervals = parseWorkoutStructure(structure);
  return intervals.length > 0;
};

