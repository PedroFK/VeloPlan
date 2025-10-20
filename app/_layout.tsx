import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { initializeDataIfNeeded } from '@/services/initializeData';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      initializeDataIfNeeded();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <NavigationThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
          },
          headerTintColor: isDark ? '#ffffff' : '#0f172a',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="workout/new" 
          options={{ 
            title: 'Novo Treino',
            presentation: 'modal',
          }} 
        />
        <Stack.Screen 
          name="workout/edit/[id]" 
          options={{ 
            title: 'Editar Treino',
            presentation: 'modal',
          }} 
        />
        <Stack.Screen 
          name="workout/[id]" 
          options={{ 
            title: 'Detalhes do Treino',
          }} 
        />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </NavigationThemeProvider>
  );
}
