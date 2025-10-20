export type WorkoutType = 'força' | 'resistência' | 'cardio';

export type ZoneIntensity = 'z1' | 'z2' | 'z3' | 'z4' | 'z5';

export interface WorkoutInterval {
  duration: number; // em minutos
  intensity: number; // 1-5 (zonas)
  description?: string;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  duration: number; // em minutos
  type: WorkoutType;
  structure: string; // formato texto: "3x(1m z5 / 2m z2)"
  intervals: WorkoutInterval[]; // versão parseada
  createdAt: string;
  updatedAt: string;
}

export interface WorkoutFormData {
  name: string;
  description: string;
  duration: string;
  type: WorkoutType;
  structure: string;
}

