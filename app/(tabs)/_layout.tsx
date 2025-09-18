import { Link, Tabs } from 'expo-router';
import { InfoIcon, SunIcon } from 'lucide-react-native';
import React from 'react';
import { Platform, Pressable, StatusBar, StyleSheet, View } from 'react-native';

import { Text } from '@/components/Themed';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

function TabHeader({ title }: { title: string }) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.headerContainer, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <View style={styles.headerContent}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>{title}</Text>
        <View style={styles.headerActions}>
          <Pressable
            onPress={() => {
              console.log('Light bulb pressed');
            }}>
            {({ pressed }) => (
              <SunIcon size={28} color={colors.text} style={{ marginBottom: -3 }} />
            )}
          </Pressable>
          <Link href="/modal" asChild>
            <Pressable>
              {({ pressed }) => (
                <InfoIcon
                  size={25}
                  color={colors.text}
                  style={[styles.actionIcon, { opacity: pressed ? 0.5 : 1 }]}
                />
              )}
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <SunIcon size={28} color={color} style={{ marginBottom: -3 }} />,
          header: () => <TabHeader title="Tab One" />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <InfoIcon size={28} color={color} style={{ marginBottom: -3 }} />,
          header: () => <TabHeader title="Tab Two" />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight || 0,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginLeft: 15,
  },
});
