import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  options,
  onChange,
  error,
}) => {
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
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              {
                backgroundColor:
                  value === option.value
                    ? '#3b82f6'
                    : isDark
                    ? '#1e293b'
                    : '#ffffff',
                borderColor:
                  value === option.value
                    ? '#3b82f6'
                    : isDark
                    ? '#334155'
                    : '#e2e8f0',
              },
            ]}
            onPress={() => onChange(option.value)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.optionText,
                {
                  color:
                    value === option.value
                      ? '#ffffff'
                      : isDark
                      ? '#e2e8f0'
                      : '#334155',
                },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
  optionsContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  option: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  error: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
});

