export type WorkoutType = 'força' | 'resistência' | 'cardio';

export type ZoneIntensity = 'z1' | 'z2' | 'z3' | 'z4' | 'z5';

export interface WorkoutInterval {
  duration: number;
  intensity: number;
  description?: string;
  type?: string;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  duration: number;
  type: WorkoutType;
  structure: string;
  intervals: WorkoutInterval[];
  createdAt: string;
  updatedAt: string;
}

export interface WorkoutFormData {
  name: string;
  description: string;
  type: WorkoutType;
  structure: string;
}

