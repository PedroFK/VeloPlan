import { WorkoutInterval } from '@/types/workout';

export const parseWorkoutStructure = (structure: string): WorkoutInterval[] => {
  const intervals: WorkoutInterval[] = [];
  
  try {
    const lines = structure.split('\n').map(line => line.trim());
    
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      
      if (!line) {
        i++;
        continue;
      }
      
      if (!line.startsWith('-') && !line.match(/^\d+x$/)) {
        i++;
        continue;
      }
      
      const repeatMatch = line.match(/^(\d+)x$/);
      if (repeatMatch) {
        const repeats = parseInt(repeatMatch[1]);
        i++;
        
        const blockIntervals: WorkoutInterval[] = [];
        while (i < lines.length && lines[i] && lines[i].startsWith('-')) {
          const interval = parseSingleInterval(lines[i]);
          if (interval) blockIntervals.push(interval);
          i++;
        }
        
        for (let r = 0; r < repeats; r++) {
          intervals.push(...blockIntervals);
        }
        continue;
      }
      
      if (line.startsWith('-')) {
        const interval = parseSingleInterval(line);
        if (interval) intervals.push(interval);
        i++;
        continue;
      }
      
      i++;
    }
  } catch (error) {
    console.error('Erro ao fazer parse da estrutura:', error);
  }
  
  return intervals;
};

const parseSingleInterval = (text: string): WorkoutInterval | null => {
  try {
    const cleaned = text.replace(/^-\s*/, '');
    
    const matchMin = cleaned.match(/^(\d+(?:\.\d+)?)\s*m\s+Z(\d)(?:-Z(\d))?\s+HR\s+intensity=(\w+)/i);
    if (matchMin) {
      const duration = parseFloat(matchMin[1]);
      const intensity1 = parseInt(matchMin[2]);
      const intensity2 = matchMin[3] ? parseInt(matchMin[3]) : intensity1;
      const intensityType = matchMin[4];
      
      return {
        duration,
        intensity: Math.round((intensity1 + intensity2) / 2),
        description: cleaned,
        type: intensityType,
      };
    }
    
    const matchSec = cleaned.match(/^(\d+(?:\.\d+)?)\s*s\s+Z(\d)(?:-Z(\d))?\s+HR\s+intensity=(\w+)/i);
    if (matchSec) {
      const duration = parseFloat(matchSec[1]) / 60;
      const intensity1 = parseInt(matchSec[2]);
      const intensity2 = matchSec[3] ? parseInt(matchSec[3]) : intensity1;
      const intensityType = matchSec[4];
      
      return {
        duration,
        intensity: Math.round((intensity1 + intensity2) / 2),
        description: cleaned,
        type: intensityType,
      };
    }
    
    const matchKm = cleaned.match(/^(\d+(?:\.\d+)?)\s*km\s+.*?Z(\d)(?:-Z(\d))?\s+HR\s+intensity=(\w+)/i);
    if (matchKm) {
      const distance = parseFloat(matchKm[1]);
      const intensity1 = parseInt(matchKm[2]);
      const intensity2 = matchKm[3] ? parseInt(matchKm[3]) : intensity1;
      const intensityType = matchKm[4];
      
      const estimatedDuration = distance / 20 * 60;
      
      return {
        duration: estimatedDuration,
        intensity: Math.round((intensity1 + intensity2) / 2),
        description: cleaned,
        type: intensityType,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao fazer parse do intervalo:', error);
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

