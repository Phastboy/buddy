import React from 'react';
import { Tabs } from 'expo-router';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/utils/useTheme';

export default function TabLayout() {
  const { theme } = useAppTheme();
  const { activeIcon, inactiveIcon, background, text, card } = theme.colors;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeIcon,
        tabBarInactiveTintColor: inactiveIcon,
        tabBarStyle: {
          backgroundColor: background,
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, false),
        headerStyle: {
          backgroundColor: background,
        },
        headerTintColor: text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'search-sharp' : 'search-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'calendar-sharp' : 'calendar-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'chatbubble-sharp' : 'chatbubble-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
