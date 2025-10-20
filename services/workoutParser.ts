import { WorkoutInterval } from '@/types/workout';

export const parseWorkoutStructure = (structure: string): WorkoutInterval[] => {
  const intervals: WorkoutInterval[] = [];
  
  try {
    const cleaned = structure.trim().toLowerCase();
    
    const repeatMatch = cleaned.match(/^(\d+)x\((.*)\)$/);
    
    if (repeatMatch) {
      const repeats = parseInt(repeatMatch[1]);
      const content = repeatMatch[2];
      
      const parts = content.split('/').map(p => p.trim());
      
      for (let i = 0; i < repeats; i++) {
        parts.forEach(part => {
          const interval = parseSingleInterval(part);
          if (interval) intervals.push(interval);
        });
      }
    } else {
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

const parseSingleInterval = (text: string): WorkoutInterval | null => {
  try {
    const matchMin = text.match(/(\d+(?:\.\d+)?)\s*(?:m|min)\s*z(\d)/);
    if (matchMin) {
      return {
        duration: parseFloat(matchMin[1]),
        intensity: parseInt(matchMin[2]),
        description: text,
      };
    }
    
    const matchSec = text.match(/(\d+(?:\.\d+)?)\s*(?:s|sec|seg)\s*z(\d)/);
    if (matchSec) {
      return {
        duration: parseFloat(matchSec[1]) / 60,
        intensity: parseInt(matchSec[2]),
        description: text,
      };
    }
    
    return null;
  } catch (error) {
    return null;
  }
};

export const generateChartData = (intervals: WorkoutInterval[]) => {
  const data: { x: number; y: number }[] = [];
  let currentTime = 0;
  
  intervals.forEach((interval) => {
    data.push({ x: currentTime, y: interval.intensity });
    
    currentTime += interval.duration;
    data.push({ x: currentTime, y: interval.intensity });
  });
  
  return data;
};

export const validateWorkoutStructure = (structure: string): boolean => {
  if (!structure.trim()) return false;
  
  const intervals = parseWorkoutStructure(structure);
  return intervals.length > 0;
};

