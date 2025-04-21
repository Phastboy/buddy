import ThemedText from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Animated, Text, View } from 'react-native';

export default function NotificationScreen() {
  const router = useRouter();
  return (
    <ThemedView>
      <ThemedText>Notification Screen</ThemedText>
    </ThemedView>
  );
}
