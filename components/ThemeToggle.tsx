import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Pressable
      onPress={toggleTheme}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: isDark ? '#334155' : '#e2e8f0',
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View style={styles.iconContainer}>
        {isDark ? (
          <Moon size={20} color="#fbbf24" />
        ) : (
          <Sun size={20} color="#f59e0b" />
        )}
      </View>
      <Text
        style={[
          styles.text,
          { color: isDark ? '#e2e8f0' : '#0f172a' },
        ]}
      >
        {isDark ? 'Modo Escuro' : 'Modo Claro'}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});


