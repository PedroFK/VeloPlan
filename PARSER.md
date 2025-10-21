# Correções na Sintaxe de Treinos e Parser

## Alterações Realizadas

### 1. Novo Formato de Sintaxe

A sintaxe dos treinos foi atualizada para seguir o padrão especificado:

**Antes:**
```
5x(1m z5 / 2m z2)
```

**Depois:**
```
Warmup
- 10m Z2 HR intensity=warmup

2x
- 1m Z5 HR intensity=interval
- 2m Z2 HR intensity=rest

Cooldown
- 10m Z1 HR intensity=cooldown
```

### 2. Parser Reescrito (`services/workoutParser.ts`)

O parser foi completamente reescrito para processar o novo formato:

#### Recursos Implementados:

✅ **Seções nomeadas**: Warmup, Cooldown, etc.
✅ **Blocos de repetição**: `2x`, `4x`, com intervalos aninhados
✅ **Múltiplas unidades de tempo**:
   - Minutos: `10m`, `15m`
   - Segundos: `30s`, `45s` (convertidos para minutos)
   - Distância: `70km` (estima duração baseada em velocidade média)
   
✅ **Zonas de intensidade**:
   - Simples: `Z1`, `Z2`, `Z3`, `Z4`, `Z5`
   - Compostas: `Z2-Z3`, `Z2-Z1` (calcula média)
   
✅ **Tipos de intensidade**: `warmup`, `interval`, `rest`, `cooldown`, `active`

### 3. Tipo WorkoutInterval Atualizado (`types/workout.ts`)

Adicionado campo opcional `type` para armazenar o tipo de intensidade:

```typescript
export interface WorkoutInterval {
  duration: number;
  intensity: number;
  description?: string;
  type?: string; // NOVO: warmup, interval, rest, cooldown, etc.
}
```

### 4. Dados de Exemplo Atualizados (`services/sampleData.ts`)

Todos os treinos de exemplo foram atualizados para usar a nova sintaxe:

- **Treino 1**: Treino Intervalado HIIT (68 min)
- **Treino 2**: Long Ride Base (230 min - 70km)
- **Treino 3**: Threshold Intervals (71 min)
- **Treino 4**: Mixed Intensity (54 min)

### 5. Testes Completos Adicionados

Criado `services/__tests__/workoutParser.spec.ts` com cobertura completa:

- ✅ 11 casos de teste
- ✅ Cobre todos os cenários de parse
- ✅ Testa validação e geração de gráficos
- ✅ Testa casos de erro

### 6. Configuração de Testes

Adicionado Jest ao projeto:

- `jest.config.js`: Configuração do Jest
- `jest.setup.js`: Mocks e setup
- Scripts no `package.json`:
  - `npm test`: Executar testes
  - `npm run test:watch`: Modo watch
  - `npm run test:coverage`: Relatório de cobertura

## Exemplos de Uso

### Exemplo 1: HIIT Completo

```
Warmup
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

Cooldown
- 15m Z2-Z1 HR intensity=cooldown
```

### Exemplo 2: Long Ride

```
Warmup
- 10m Z1 HR intensity=warmup

- 70km freeride Z2 HR intensity=active

Cooldown
- 10m Z1 HR intensity=cooldown
```

### Exemplo 3: Threshold

```
Warmup
- 10m Z2 HR intensity=warmup

2x
- 10m Z4 HR intensity=interval
- 10m Z2 HR intensity=rest

- 10m Z4 HR intensity=interval

Cooldown
- 10m Z1 HR intensity=cooldown
```

## Como Testar

1. Instalar dependências:
   ```bash
   npm install
   ```

2. Executar testes:
   ```bash
   npm test
   ```

3. Ver cobertura:
   ```bash
   npm run test:coverage
   ```


## Compatibilidade

Os componentes existentes (`WorkoutCard`, `WorkoutChart`, `MiniChart`) continuam funcionando sem alterações, pois utilizam a interface `WorkoutInterval` que manteve retrocompatibilidade.

