# 🏗️ Arquitetura do WorkoutPlanner

## 📐 Visão Geral

O WorkoutPlanner segue uma arquitetura bem definida baseada em separação de responsabilidades, usando React Native com Expo e TypeScript.

## 🗂️ Estrutura de Pastas

### `/app` - Rotas e Navegação
Utiliza o Expo Router (navegação baseada em arquivos):

```
app/
├── (tabs)/              # Grupo de tabs
│   ├── _layout.tsx      # Configuração das tabs
│   ├── index.tsx        # Tab 1: Lista de treinos
│   └── two.tsx          # Tab 2: Estatísticas
├── workout/             # Rotas de workout
│   ├── [id].tsx         # Detalhes (dinâmico)
│   ├── new.tsx          # Novo treino (modal)
│   └── edit/[id].tsx    # Edição (modal)
├── _layout.tsx          # Layout raiz
└── +not-found.tsx       # Página 404
```

**Padrão**: Cada arquivo representa uma rota. Parâmetros dinâmicos usam `[param]`.

### `/screens` - Telas
Componentes de tela reutilizáveis:

- `WorkoutsListScreen.tsx` - Lista principal
- `WorkoutFormScreen.tsx` - Formulário (novo/editar)
- `WorkoutDetailScreen.tsx` - Detalhes completos

**Padrão**: Uma tela = um arquivo. Lógica de UI separada da navegação.

### `/components` - Componentes Reutilizáveis

```
components/
├── ui/                  # Componentes de UI básicos
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── Select.tsx
├── WorkoutCard.tsx      # Card específico de workout
├── WorkoutChart.tsx     # Gráfico completo
└── MiniChart.tsx        # Preview do gráfico
```

**Padrão**: Componentes puros, recebem dados via props, sem lógica de negócio.

### `/services` - Lógica de Negócio

```
services/
├── storageService.ts    # Abstração do AsyncStorage
├── workoutParser.ts     # Parse de estrutura de treino
├── sampleData.ts        # Dados de exemplo
└── initializeData.ts    # Inicialização do app
```

**Padrão**: Funções puras ou objetos com métodos. Sem dependências de UI.

### `/hooks` - Custom Hooks

```
hooks/
└── useWorkouts.ts       # Hook para gerenciar workouts
```

**Padrão**: Lógica reutilizável de estado e efeitos.

### `/types` - Definições TypeScript

```
types/
└── workout.ts           # Tipos relacionados a treinos
```

**Padrão**: Interfaces e types exportados. Sem lógica.

### `/constants` - Constantes

```
constants/
└── Colors.ts            # Paleta de cores
```

## 🔄 Fluxo de Dados

### Leitura de Dados

```
Screen/Component
    ↓ (usa)
Custom Hook (useWorkouts)
    ↓ (chama)
Service (storageService)
    ↓ (acessa)
AsyncStorage
```

### Escrita de Dados

```
User Action (Button press)
    ↓ (dispara)
Event Handler (handleSave)
    ↓ (chama)
Custom Hook (addWorkout)
    ↓ (chama)
Service (saveWorkout)
    ↓ (salva)
AsyncStorage
    ↓ (recarrega)
Custom Hook (loadWorkouts)
    ↓ (atualiza)
Component State
```

## 🎯 Princípios de Design

### 1. Separação de Responsabilidades
- **Screens**: Apenas layout e composição
- **Components**: UI reutilizável
- **Services**: Lógica de negócio
- **Hooks**: Estado e side effects
- **Types**: Contratos de dados

### 2. Single Source of Truth
- AsyncStorage é a única fonte de dados
- Estado gerenciado pelo hook `useWorkouts`
- Atualização sempre via serviços

### 3. Composição sobre Herança
- Componentes pequenos e focados
- Reutilização via composição
- Props para customização

### 4. Type Safety
- TypeScript em todo o código
- Interfaces bem definidas
- Validação em runtime quando necessário

## 🔌 Principais Dependências

### Core
- **React Native**: Framework mobile
- **Expo**: Toolchain e SDK
- **TypeScript**: Type safety

### Navegação
- **Expo Router**: Navegação baseada em arquivos
- **React Navigation**: Base da navegação

### Armazenamento
- **AsyncStorage**: Persistência local

### UI
- **React Native SVG**: Gráficos vetoriais
- **Lucide React Native**: Ícones
- **Victory Native**: Gráficos de dados

## 🎨 Sistema de Temas

### Cores Principais
```typescript
primary: '#3b82f6'      // Azul
secondary: '#f97316'    // Laranja
danger: '#ef4444'       // Vermelho
success: '#10b981'      // Verde
```

### Cores por Tipo
```typescript
força: '#ef4444'        // Vermelho
resistência: '#3b82f6'  // Azul
cardio: '#f97316'       // Laranja
```

### Tema Escuro
```typescript
bg: '#0f172a'          // Slate 950
card: '#1e293b'        // Slate 800
border: '#334155'      // Slate 700
text: '#ffffff'        // Branco
```

### Tema Claro
```typescript
bg: '#f8fafc'          // Slate 50
card: '#ffffff'        // Branco
border: '#e2e8f0'      // Slate 200
text: '#0f172a'        // Slate 950
```

## 📦 Modelos de Dados

### Workout
```typescript
interface Workout {
  id: string              // UUID
  name: string            // Nome do treino
  description: string     // Descrição
  duration: number        // Duração em minutos
  type: WorkoutType       // força | resistência | cardio
  structure: string       // Formato texto
  intervals: WorkoutInterval[]  // Versão parseada
  createdAt: string       // ISO 8601
  updatedAt: string       // ISO 8601
}
```

### WorkoutInterval
```typescript
interface WorkoutInterval {
  duration: number        // Minutos (pode ser decimal)
  intensity: number       // 1-5 (zonas)
  description?: string    // Descrição opcional
}
```

## 🔐 Validação

### Validação de Formulário
1. Campos obrigatórios verificados
2. Duração deve ser > 0
3. Estrutura deve ser parseável
4. Feedback visual de erros

### Validação de Parse
1. Regex para detectar padrões
2. Suporte a minutos e segundos
3. Suporte a repetições
4. Fallback gracioso em caso de erro

## 🧪 Padrões de Teste (Futuro)

### Testes Unitários
- Services (storageService, workoutParser)
- Utils e helpers
- Custom hooks

### Testes de Integração
- Fluxo completo de CRUD
- Navegação entre telas
- Parse e validação

### Testes E2E
- Adicionar treino completo
- Editar e deletar
- Visualizar estatísticas

## 🚀 Performance

### Otimizações Implementadas
- FlatList virtualizado para listas longas
- Memoization de componentes pesados
- Lazy loading de rotas
- SVG otimizado para gráficos

### Otimizações Futuras
- React.memo em componentes puros
- useMemo/useCallback onde apropriado
- Code splitting
- Image optimization

## 📱 Responsividade

- Layout flexível com Flexbox
- Dimensões relativas (%, flex)
- Suporte a diferentes tamanhos de tela
- Safe area handling (iOS)

## 🔒 Segurança

- Sem dados sensíveis
- Armazenamento local apenas
- Validação de inputs
- Sanitização de dados

## 📈 Escalabilidade

### Arquitetura Preparada Para
- Adicionar backend
- Autenticação/usuários
- Sincronização cloud
- Features avançadas

### Pontos de Extensão
- Services podem virar API clients
- AsyncStorage pode ser substituído
- Navegação pode ser expandida
- Novos tipos de treinos fáceis de adicionar

## 🛠️ Manutenção

### Boas Práticas
- Código comentado
- Naming consistente
- Estrutura clara
- TypeScript strict mode

### Debt Técnico
- Nenhum identificado no momento
- Código limpo e organizado
- Pronto para produção

