import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#3b82f6',
          color: '#ffffff',
        };
      case 'secondary':
        return {
          backgroundColor: '#f97316',
          color: '#ffffff',
        };
      case 'danger':
        return {
          backgroundColor: '#ef4444',
          color: '#ffffff',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: isDark ? '#ffffff' : '#0f172a',
          borderWidth: 1,
          borderColor: isDark ? '#334155' : '#e2e8f0',
        };
      default:
        return {
          backgroundColor: '#3b82f6',
          color: '#ffffff',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: 8,
          paddingHorizontal: 12,
          fontSize: 14,
        };
      case 'md':
        return {
          paddingVertical: 12,
          paddingHorizontal: 16,
          fontSize: 16,
        };
      case 'lg':
        return {
          paddingVertical: 16,
          paddingHorizontal: 24,
          fontSize: 18,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: variantStyles.backgroundColor,
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          width: fullWidth ? '100%' : 'auto',
          opacity: disabled || loading ? 0.6 : 1,
        },
        variant === 'ghost' && {
          borderWidth: 1,
          borderColor: variantStyles.borderColor,
        },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles.color} size="small" />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: variantStyles.color,
              fontSize: sizeStyles.fontSize,
            },
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontWeight: '600',
  },
});

