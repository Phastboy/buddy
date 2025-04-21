import AnimatedThemedView from '@/components/ui/AnimatedView';
import ThemedText from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';
import { useRouter } from 'expo-router';

export default function TimelineScreen() {
  const router = useRouter();
  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView>
        <ThemedText variant="title">New Text</ThemedText>
      </ThemedView>
      <ThemedText variant="body">Timeline Screen</ThemedText>
      <AnimatedThemedView>
        <ThemedText variant="caption">Animated Themed View</ThemedText>
      </AnimatedThemedView>
    </ThemedView>
  );
}
