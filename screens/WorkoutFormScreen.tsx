import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useTheme } from '@/contexts/ThemeContext';
import { storageService } from '@/services/storageService';
import { parseWorkoutStructure, validateWorkoutStructure } from '@/services/workoutParser';
import { Workout, WorkoutFormData, WorkoutType } from '@/types/workout';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function WorkoutFormScreen() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState<WorkoutFormData>({
    name: '',
    description: '',
    type: 'resistência',
    structure: '',
  });

  const [errors, setErrors] = useState<Partial<WorkoutFormData>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && typeof id === 'string') {
      loadWorkout(id);
    }
  }, [id]);

  const loadWorkout = async (workoutId: string) => {
    try {
      const workout = await storageService.getWorkoutById(workoutId);
      if (workout) {
        setFormData({
          name: workout.name,
          description: workout.description,
          type: workout.type,
          structure: workout.structure,
        });
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o treino');
      router.back();
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<WorkoutFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.structure.trim()) {
      newErrors.structure = 'Estrutura é obrigatória';
    } else if (!validateWorkoutStructure(formData.structure)) {
      newErrors.structure = 'Formato inválido. Veja o exemplo abaixo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const intervals = parseWorkoutStructure(formData.structure);
      const calculatedDuration = intervals.reduce((sum, interval) => sum + interval.duration, 0);

      if (isEditing && typeof id === 'string') {
        await storageService.updateWorkout(id, {
          name: formData.name,
          description: formData.description,
          duration: Math.round(calculatedDuration),
          type: formData.type,
          structure: formData.structure,
          intervals,
        });
        Alert.alert('Sucesso', 'Treino atualizado com sucesso!');
      } else {
        const newWorkout: Workout = {
          id: Date.now().toString(),
          name: formData.name,
          description: formData.description,
          duration: Math.round(calculatedDuration),
          type: formData.type,
          structure: formData.structure,
          intervals,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await storageService.saveWorkout(newWorkout);
        Alert.alert('Sucesso', 'Treino criado com sucesso!');
      }

      router.back();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o treino');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: isDark ? '#0f172a' : '#f8fafc' },
        ]}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              { color: isDark ? '#ffffff' : '#0f172a' },
            ]}
          >
            {isEditing ? 'Editar Treino' : 'Novo Treino'}
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Nome do Treino *"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Ex: Treino Intervalado"
            error={errors.name}
          />

          <Input
            label="Descrição"
            value={formData.description}
            onChangeText={(text) =>
              setFormData({ ...formData, description: text })
            }
            placeholder="Descreva o objetivo do treino"
            multiline
            numberOfLines={3}
            style={{ minHeight: 80, textAlignVertical: 'top' }}
          />

          <Select
            label="Tipo de Treino *"
            value={formData.type}
            options={[
              { label: 'Força', value: 'força' },
              { label: 'Resistência', value: 'resistência' },
              { label: 'Cardio', value: 'cardio' },
            ]}
            onChange={(value) =>
              setFormData({ ...formData, type: value as WorkoutType })
            }
          />

          <Input
            label="Estrutura do Treino *"
            value={formData.structure}
            onChangeText={(text) =>
              setFormData({ ...formData, structure: text })
            }
            placeholder="Digite a estrutura do treino..."
            multiline
            numberOfLines={8}
            style={{ minHeight: 180, textAlignVertical: 'top', fontFamily: 'monospace' }}
            error={errors.structure}
          />

          <View
            style={[
              styles.helpBox,
              {
                backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
                borderColor: isDark ? '#334155' : '#e2e8f0',
              },
            ]}
          >
            <Text
              style={[
                styles.helpTitle,
                { color: isDark ? '#e2e8f0' : '#334155' },
              ]}
            >
              💡 Formato da estrutura:
            </Text>
            <Text
              style={[
                styles.helpText,
                { color: isDark ? '#94a3b8' : '#64748b' },
              ]}
            >
              <Text style={{ fontWeight: '600' }}>Exemplo:</Text>{'\n'}
              {'\n'}
              Warmup{'\n'}
              - 10m Z2 HR intensity=warmup{'\n'}
              {'\n'}
              2x{'\n'}
              - 10m Z4 HR intensity=interval{'\n'}
              - 10m Z2 HR intensity=rest{'\n'}
              {'\n'}
              - 10m Z4 HR intensity=interval{'\n'}
              {'\n'}
              Cooldown{'\n'}
              - 10m Z1 HR intensity=cooldown
            </Text>
          </View>

          <View style={styles.actions}>
            <View style={styles.buttonWrapper}>
              <Button
                title="Cancelar"
                onPress={() => router.back()}
                variant="ghost"
                fullWidth
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title={isEditing ? 'Salvar' : 'Criar'}
                onPress={handleSubmit}
                variant="primary"
                fullWidth
                loading={loading}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  form: {
    paddingHorizontal: 20,
  },
  helpBox: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
  },
  helpTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 13,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonWrapper: {
    flex: 1,
  },
});

