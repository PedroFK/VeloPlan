import { Workout } from '@/types/workout';
import { parseWorkoutStructure } from './workoutParser';

export const sampleWorkouts: Workout[] = [
  {
    id: '1',
    name: 'Treino Intervalado HIIT',
    description: 'Treino de alta intensidade para queima de gordura e melhora cardiovascular',
    duration: 30,
    type: 'cardio',
    structure: '5x(1m z5 / 2m z2)',
    intervals: parseWorkoutStructure('5x(1m z5 / 2m z2)'),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    name: 'Resistência Base',
    description: 'Treino de resistência aeróbica para construir base cardiovascular',
    duration: 60,
    type: 'resistência',
    structure: '10m z2 / 40m z3 / 10m z2',
    intervals: parseWorkoutStructure('10m z2 / 40m z3 / 10m z2'),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    name: 'Força Explosiva',
    description: 'Treino focado em força e potência muscular',
    duration: 45,
    type: 'força',
    structure: '8x(30s z5 / 2m z1)',
    intervals: parseWorkoutStructure('8x(30s z5 / 2m z1)'),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    name: 'Pirâmide de Intensidade',
    description: 'Treino progressivo com aumento e redução gradual de intensidade',
    duration: 50,
    type: 'cardio',
    structure: '5m z2 / 3m z3 / 2m z4 / 1m z5 / 2m z4 / 3m z3 / 5m z2',
    intervals: parseWorkoutStructure('5m z2 / 3m z3 / 2m z4 / 1m z5 / 2m z4 / 3m z3 / 5m z2'),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

