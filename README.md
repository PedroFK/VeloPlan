# 🏋️‍♂️ WorkoutPlanner

Um aplicativo completo de gerenciamento de treinos desenvolvido em React Native com Expo.

## 📱 Sobre

O WorkoutPlanner é um app moderno para criar, editar e visualizar treinos de forma organizada. Com suporte a gráficos de intensidade, armazenamento local e uma interface bonita e intuitiva.

## ✨ Funcionalidades

- ✅ **CRUD Completo**: Criar, visualizar, editar e excluir treinos
- 📊 **Gráficos de Intensidade**: Visualização gráfica das zonas de treino
- 💾 **Armazenamento Local**: Dados salvos com AsyncStorage
- 🌓 **Tema Claro/Escuro**: Suporte automático a tema do sistema
- 📈 **Estatísticas**: Dashboard com estatísticas dos treinos
- 🎨 **UI Moderna**: Interface bonita com cards, animações e ícones

## 🛠️ Tecnologias

- **React Native** (0.81.4)
- **Expo** (~54.0.2)
- **TypeScript** (~5.9.2)
- **Expo Router** (~6.0.1) - Navegação baseada em arquivos
- **AsyncStorage** - Armazenamento local
- **React Native SVG** - Gráficos vetoriais
- **Lucide React Native** - Ícones modernos
- **Victory Native** - Gráficos de dados

## 📁 Estrutura do Projeto

```
VeloPlan/
├── app/                      # Rotas (Expo Router)
│   ├── (tabs)/              # Navegação por tabs
│   │   ├── index.tsx        # Lista de treinos
│   │   └── two.tsx          # Estatísticas
│   ├── workout/             # Rotas de workout
│   │   ├── [id].tsx         # Detalhes
│   │   ├── new.tsx          # Novo treino
│   │   └── edit/[id].tsx    # Edição
│   └── _layout.tsx          # Layout raiz
├── components/              # Componentes reutilizáveis
│   ├── ui/                  # Componentes de UI
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Select.tsx
│   ├── WorkoutCard.tsx      # Card de treino
│   ├── WorkoutChart.tsx     # Gráfico completo
│   └── MiniChart.tsx        # Preview do gráfico
├── screens/                 # Telas principais
│   ├── WorkoutsListScreen.tsx
│   ├── WorkoutFormScreen.tsx
│   └── WorkoutDetailScreen.tsx
├── services/                # Lógica de negócio
│   ├── storageService.ts    # AsyncStorage
│   ├── workoutParser.ts     # Parse de estrutura
│   ├── sampleData.ts        # Dados de exemplo
│   └── initializeData.ts    # Inicialização
├── hooks/                   # Custom hooks
│   └── useWorkouts.ts
├── types/                   # TypeScript types
│   └── workout.ts
└── constants/               # Constantes e temas
    └── Colors.ts
```

## 🚀 Como Usar

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar o app
npm start
```

### Comandos Disponíveis

```bash
npm start           # Inicia o Expo
npm run android     # Abre no Android
npm run ios         # Abre no iOS
npm run web         # Abre no navegador
```

## 📝 Formato de Treino

O app suporta uma sintaxe simples para estruturar treinos:

### Sintaxe

- **Duração**: Use `m` ou `min` para minutos, `s` ou `sec` para segundos
- **Intensidade**: Use `z1` a `z5` para zonas de intensidade
- **Separação**: Use `/` para separar intervalos
- **Repetição**: Use `Nx(...)` para repetir intervalos

### Exemplos

```
5x(1m z5 / 2m z2)              # 5 repetições de 1 min intenso + 2 min leve
10m z2 / 40m z3 / 10m z2       # Aquecimento + treino + desaquecimento
8x(30s z5 / 2m z1)             # Sprints de 30 segundos
5m z2 / 3m z3 / 2m z4 / 1m z5  # Pirâmide crescente
```

## 🎨 Design

- **Cores Primárias**: Azul (#3b82f6) e Laranja (#f97316)
- **Tipografia**: San Francisco (iOS) / Roboto (Android)
- **Tema Escuro**: Suporte automático baseado no sistema
- **Componentes**: Cards com bordas arredondadas e sombras suaves

## 📊 Tipos de Treino

- 💪 **Força**: Treinos focados em potência muscular
- 🏃 **Resistência**: Treinos aeróbicos de longa duração
- ❤️ **Cardio**: Treinos cardiovasculares intensos

## 🔄 Dados de Exemplo

O app inicializa automaticamente com 4 treinos de exemplo se não houver dados salvos:

1. **Treino Intervalado HIIT** - 30 min (Cardio)
2. **Resistência Base** - 60 min (Resistência)
3. **Força Explosiva** - 45 min (Força)
4. **Pirâmide de Intensidade** - 50 min (Cardio)

## 🧪 TypeScript

Todo o código é fortemente tipado com TypeScript para melhor manutenibilidade e detecção de erros.

## 📱 Screenshots

### Tela Principal
Lista de treinos com cards informativos, botão flutuante para adicionar novos treinos.

### Tela de Detalhes
Informações completas do treino com gráfico grande de intensidade e lista de intervalos.

### Tela de Formulário
Formulário completo com validação para criar/editar treinos.

### Tela de Estatísticas
Dashboard com estatísticas gerais e distribuição por tipo de treino.

## 🤝 Contribuindo

Sinta-se à vontade para contribuir com melhorias, correções de bugs ou novas funcionalidades!

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Desenvolvido com

- ❤️ Paixão por fitness e tecnologia
- ☕ Muito café
- 🎵 Boa música

---

**WorkoutPlanner** - Planeje seus treinos de forma inteligente! 💪

