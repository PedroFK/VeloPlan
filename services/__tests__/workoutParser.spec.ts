import { generateChartData, parseWorkoutStructure, validateWorkoutStructure } from '../workoutParser';

describe('workoutParser', () => {
  describe('parseWorkoutStructure', () => {
    it('deve fazer parse de um treino simples com warmup e cooldown', () => {
      const structure = `Warmup
- 10m Z2 HR intensity=warmup

- 20m Z3 HR intensity=active

Cooldown
- 10m Z1 HR intensity=cooldown`;

      const result = parseWorkoutStructure(structure);

      expect(result).toHaveLength(3);
      expect(result[0]).toMatchObject({
        duration: 10,
        intensity: 2,
        type: 'warmup',
      });
      expect(result[1]).toMatchObject({
        duration: 20,
        intensity: 3,
        type: 'active',
      });
      expect(result[2]).toMatchObject({
        duration: 10,
        intensity: 1,
        type: 'cooldown',
      });
    });

    it('deve fazer parse de blocos com repetições (2x)', () => {
      const structure = `Warmup
- 10m Z2 HR intensity=warmup

2x
- 1m Z3 HR intensity=interval
- 1m Z2 HR intensity=rest

Cooldown
- 10m Z1 HR intensity=cooldown`;

      const result = parseWorkoutStructure(structure);

      expect(result).toHaveLength(6); // warmup + 2*(interval+rest) + cooldown
      expect(result[0].type).toBe('warmup');
      expect(result[1].type).toBe('interval');
      expect(result[2].type).toBe('rest');
      expect(result[3].type).toBe('interval');
      expect(result[4].type).toBe('rest');
      expect(result[5].type).toBe('cooldown');
    });

    it('deve fazer parse de intervalos em segundos', () => {
      const structure = `4x
- 30s Z5 HR intensity=interval
- 1m Z2 HR intensity=rest`;

      const result = parseWorkoutStructure(structure);

      expect(result).toHaveLength(8); // 4 * (interval + rest)
      expect(result[0].duration).toBe(0.5); // 30s = 0.5min
      expect(result[0].intensity).toBe(5);
      expect(result[1].duration).toBe(1);
      expect(result[1].intensity).toBe(2);
    });

    it('deve fazer parse de zonas compostas (Z2-Z3)', () => {
      const structure = `- 15m Z2-Z3 HR intensity=warmup`;

      const result = parseWorkoutStructure(structure);

      expect(result).toHaveLength(1);
      expect(result[0].duration).toBe(15);
      expect(result[0].intensity).toBe(3); // Média de Z2 e Z3 = (2+3)/2 = 2.5 arredondado para 3
    });

    it('deve fazer parse de treino com distância em km', () => {
      const structure = `Warmup
- 10m Z1 HR intensity=warmup

- 70km freeride Z2 HR intensity=active

Cooldown
- 10m Z1 HR intensity=cooldown`;

      const result = parseWorkoutStructure(structure);

      expect(result).toHaveLength(3);
      expect(result[1].intensity).toBe(2);
      expect(result[1].type).toBe('active');
      expect(result[1].duration).toBeGreaterThan(100); // 70km deve dar várias horas
    });

    it('deve fazer parse do exemplo 1 completo', () => {
      const structure = `Warmup
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

      const result = parseWorkoutStructure(structure);

      expect(result.length).toBeGreaterThan(0);
      
      // Verificar que todos os intervalos têm as propriedades necessárias
      result.forEach(interval => {
        expect(interval).toHaveProperty('duration');
        expect(interval).toHaveProperty('intensity');
        expect(interval).toHaveProperty('type');
        expect(interval.duration).toBeGreaterThan(0);
        expect(interval.intensity).toBeGreaterThanOrEqual(1);
        expect(interval.intensity).toBeLessThanOrEqual(5);
      });
    });

    it('deve fazer parse do exemplo 3 (Threshold Intervals)', () => {
      const structure = `Warmup
- 10m Z2 HR intensity=warmup

2x
- 10m Z4 HR intensity=interval
- 10m Z2 HR intensity=rest

- 10m Z4 HR intensity=interval

Cooldown
- 10m Z1 HR intensity=cooldown`;

      const result = parseWorkoutStructure(structure);

      expect(result).toHaveLength(7);
      
      const totalDuration = result.reduce((sum, interval) => sum + interval.duration, 0);
      expect(totalDuration).toBe(70);
    });

    it('deve retornar array vazio para estrutura vazia', () => {
      const result = parseWorkoutStructure('');
      expect(result).toEqual([]);
    });

    it('deve retornar array vazio para estrutura inválida', () => {
      const result = parseWorkoutStructure('texto sem formato válido');
      expect(result).toEqual([]);
    });
  });

  describe('generateChartData', () => {
    it('deve gerar dados de gráfico corretamente', () => {
      const intervals = [
        { duration: 10, intensity: 2, type: 'warmup' },
        { duration: 5, intensity: 5, type: 'interval' },
        { duration: 5, intensity: 2, type: 'rest' },
      ];

      const chartData = generateChartData(intervals);

      // Cada intervalo gera 2 pontos (início e fim)
      expect(chartData).toHaveLength(6);
      
      // Primeiro ponto
      expect(chartData[0]).toEqual({ x: 0, y: 2 });
      
      // Último ponto
      expect(chartData[5].x).toBe(20); // 10 + 5 + 5
      expect(chartData[5].y).toBe(2);
    });

    it('deve gerar dados vazios para array vazio', () => {
      const chartData = generateChartData([]);
      expect(chartData).toEqual([]);
    });
  });

  describe('validateWorkoutStructure', () => {
    it('deve validar estrutura correta', () => {
      const structure = `Warmup
- 10m Z2 HR intensity=warmup

Cooldown
- 10m Z1 HR intensity=cooldown`;

      expect(validateWorkoutStructure(structure)).toBe(true);
    });

    it('deve invalidar estrutura vazia', () => {
      expect(validateWorkoutStructure('')).toBe(false);
      expect(validateWorkoutStructure('   ')).toBe(false);
    });

    it('deve invalidar estrutura sem intervalos válidos', () => {
      const structure = `Warmup
texto sem formato`;

      expect(validateWorkoutStructure(structure)).toBe(false);
    });
  });
});

