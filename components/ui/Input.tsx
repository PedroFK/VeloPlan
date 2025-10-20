import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, style, ...props }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View style={styles.container}>
      {label && (
        <Text
          style={[
            styles.label,
            { color: isDark ? '#e2e8f0' : '#334155' },
          ]}
        >
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderColor: error
              ? '#ef4444'
              : isDark
              ? '#334155'
              : '#e2e8f0',
            color: isDark ? '#ffffff' : '#0f172a',
          },
          style,
        ]}
        placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  error: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
});

