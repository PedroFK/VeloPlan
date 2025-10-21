import { Workout } from '@/types/workout';
import { parseWorkoutStructure } from './workoutParser';

const workout1Structure = `Warmup
- 10m Z2 HR intensity=warmup

2x
- 1m Z3 HR intensity=interval
- 1m Z2 HR intensity=rest

- 1m Z3 HR intensity=interval

- 15m Z2-Z3 HR intensity=warmup

4x
- 30s Z5 HR intensity=interval
- 1m Z2 HR intensity=rest

- 30s Z5 HR intensity=interval

- 10m Z2 HR intensity=rest

4x
- 30s Z5 HR intensity=interval
- 1m Z2 HR intensity=rest

- 30s Z5 HR intensity=interval

Cooldown
- 15m Z2-Z1 HR intensity=cooldown`;

const workout2Structure = `Warmup
- 10m Z1 HR intensity=warmup

- 70km freeride Z2 HR intensity=active

Cooldown
- 10m Z1 HR intensity=cooldown`;

const workout3Structure = `Warmup
- 10m Z2 HR intensity=warmup

2x
- 10m Z4 HR intensity=interval
- 10m Z2 HR intensity=rest

- 10m Z4 HR intensity=interval

Cooldown
- 10m Z1 HR intensity=cooldown`;

const workout4Structure = `Warmup
- 10m Z2 HR intensity=warmup

3x
- 2m Z4 HR intensity=interval
- 2m Z2 HR intensity=rest

- 2m Z4 HR intensity=interval

- 5m Z2-Z3 HR intensity=active

5x
- 1m Z5 HR intensity=interval
- 1m Z2 HR intensity=rest

- 1m Z5 HR intensity=interval

Cooldown
- 10m Z1 HR intensity=cooldown`;

export const sampleWorkouts: Workout[] = [
  {
    id: '1',
    name: 'Treino Intervalado HIIT',
    description: 'Treino de alta intensidade para queima de gordura e melhora cardiovascular',
    duration: 68,
    type: 'cardio',
    structure: workout1Structure,
    intervals: parseWorkoutStructure(workout1Structure),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    name: 'Long Ride Base',
    description: 'Pedal longo em zona aeróbica para construir resistência de base',
    duration: 230,
    type: 'resistência',
    structure: workout2Structure,
    intervals: parseWorkoutStructure(workout2Structure),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    name: 'Threshold Intervals',
    description: 'Treino focado em limiar de lactato com intervalos longos',
    duration: 70,
    type: 'resistência',
    structure: workout3Structure,
    intervals: parseWorkoutStructure(workout3Structure),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    name: 'Mixed Intensity',
    description: 'Treino misto com intervalos de threshold e VO2max',
    duration: 50,
    type: 'cardio',
    structure: workout4Structure,
    intervals: parseWorkoutStructure(workout4Structure),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

