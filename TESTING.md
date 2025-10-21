# Guia de Testes - VeloPlan

## Configuração

O projeto está configurado com Jest e Testing Library para testes unitários.

### Executar testes

```bash
# Instalar dependências primeiro
npm install

# Executar todos os testes
npm test

# Executar testes em modo watch (reexecuta ao salvar)
npm run test:watch

# Executar testes com relatório de cobertura
npm run test:coverage
```

## Estrutura de Testes

Os testes devem ser colocados em pastas `__tests__` dentro dos módulos correspondentes:

```
services/
  workoutParser.ts
  __tests__/
    workoutParser.spec.ts
```

## Testes do Parser de Treinos

O arquivo `services/__tests__/workoutParser.spec.ts` contém testes para o parser que converte a sintaxe de treinos em objetos.

### Sintaxe Suportada

O parser agora suporta o novo formato de treinos:

```
Warmup
- 10m Z2 HR intensity=warmup

2x
- 1m Z3 HR intensity=interval
- 1m Z2 HR intensity=rest

Cooldown
- 15m Z1 HR intensity=cooldown
```

#### Recursos:

1. **Seções nomeadas**: Warmup, Cooldown, etc.
2. **Blocos de repetição**: `2x`, `4x`, etc.
3. **Duração em minutos**: `10m`, `15m`
4. **Duração em segundos**: `30s`, `45s`
5. **Distância em km**: `70km freeride`
6. **Zonas de intensidade**: `Z1`, `Z2`, `Z3`, `Z4`, `Z5`
7. **Zonas compostas**: `Z2-Z3` (calcula a média)
8. **Tipo de intensidade**: `intensity=warmup`, `intensity=interval`, etc.

## Cobertura de Testes

Os testes atuais cobrem:

- ✅ Parse de treinos simples
- ✅ Parse de blocos com repetições
- ✅ Conversão de segundos para minutos
- ✅ Zonas de intensidade compostas
- ✅ Treinos com distância (km)
- ✅ Validação de estruturas
- ✅ Geração de dados para gráficos
- ✅ Casos de erro (estruturas vazias/inválidas)

## Próximos Passos

Para expandir os testes:

1. Adicionar testes para os hooks (useWorkouts)
2. Adicionar testes para os componentes (WorkoutCard, WorkoutChart)
3. Adicionar testes de integração para o fluxo completo
4. Adicionar testes para o storageService

