# 🚀 Guia de Início Rápido - WorkoutPlanner

## ⚡ Começando em 3 Passos

### 1. Instalar Dependências
```bash
npm install
```

### 2. Iniciar o App
```bash
npm start
```

### 3. Escolher Plataforma
Pressione no terminal:
- `a` - Abrir no Android
- `i` - Abrir no iOS
- `w` - Abrir no navegador

## 📱 Primeira Vez Usando

O app já vem com 4 treinos de exemplo para você explorar:

1. **Treino Intervalado HIIT** (30 min)
2. **Resistência Base** (60 min)
3. **Força Explosiva** (45 min)
4. **Pirâmide de Intensidade** (50 min)

## 🎯 Funcionalidades Principais

### ➕ Adicionar Novo Treino
1. Toque no botão **+** flutuante (canto inferior direito)
2. Preencha os campos:
   - Nome (obrigatório)
   - Descrição (opcional)
   - Duração em minutos (obrigatório)
   - Tipo: Força, Resistência ou Cardio
   - Estrutura do treino (obrigatório)

### 📝 Estrutura do Treino

Use esta sintaxe simples:

**Formato Básico:**
```
[duração] [zona]
```

**Exemplos:**
```
1m z5          → 1 minuto na zona 5
30s z4         → 30 segundos na zona 4
2min z2        → 2 minutos na zona 2
```

**Com Separação:**
```
1m z5 / 2m z2  → 1 min z5, depois 2 min z2
```

**Com Repetição:**
```
5x(1m z5 / 2m z2)  → Repete 5 vezes
```

**Complexo:**
```
5m z2 / 3x(1m z5 / 2m z3) / 5m z2
```

### 👁️ Ver Detalhes
- Toque em qualquer card de treino
- Veja o gráfico completo de intensidade
- Visualize todos os intervalos

### ✏️ Editar Treino
- Toque no ícone de **lápis** no card
- Ou nos detalhes do treino
- Modifique os campos desejados
- Toque em "Salvar"

### 🗑️ Deletar Treino
- Toque no ícone de **lixeira** no card
- Confirme a exclusão

### 📊 Ver Estatísticas
- Toque na aba "Estatísticas" (ícone de gráfico)
- Veja:
  - Total de treinos
  - Minutos totais
  - Duração média
  - Distribuição por tipo

## 🎨 Tema

O app automaticamente se adapta ao tema do seu dispositivo:
- 🌞 Modo claro durante o dia
- 🌙 Modo escuro à noite

## 💡 Dicas

### Zonas de Intensidade
- **Z1** - Muito leve (recuperação)
- **Z2** - Leve (aeróbico base)
- **Z3** - Moderado (aeróbico)
- **Z4** - Forte (limiar)
- **Z5** - Máximo (anaeróbico)

### Exemplos de Treinos

**HIIT Básico:**
```
5x(1m z5 / 2m z2)
```

**Long Run:**
```
10m z2 / 40m z3 / 10m z2
```

**Sprints:**
```
10x(30s z5 / 90s z1)
```

**Pirâmide:**
```
1m z3 / 2m z4 / 3m z5 / 2m z4 / 1m z3
```

**Fartlek:**
```
5m z2 / 2m z4 / 1m z2 / 1m z5 / 2m z2 / 3m z4 / 5m z2
```

## 🔄 Atualizar Lista

Puxe para baixo (pull-to-refresh) na lista de treinos para recarregar os dados.

## ❓ Problemas Comuns

### Erro ao salvar treino
- Verifique se todos os campos obrigatórios estão preenchidos
- Confirme que a estrutura está no formato correto
- Exemplo válido: `3x(1m z5 / 2m z2)`

### Gráfico não aparece
- A estrutura do treino deve ser parseável
- Use o formato: `[tempo][unidade] z[zona]`
- Zonas devem ser de 1 a 5

### App não inicia
```bash
# Limpe o cache
npm start -- --clear

# Reinstale dependências
rm -rf node_modules
npm install
```

## 📚 Mais Informações

- **README.md** - Documentação completa
- **FEATURES.md** - Lista de funcionalidades
- **ARCHITECTURE.md** - Arquitetura do projeto

## 🆘 Suporte

Encontrou um bug ou tem uma sugestão?
Abra uma issue no repositório!

---

**Bons treinos! 💪🏃‍♂️🚴‍♀️**

