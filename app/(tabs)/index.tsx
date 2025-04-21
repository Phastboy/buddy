import AnimatedThemedView from '@/components/ui/AnimatedView';
import ThemedText from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';

export default function TimelineScreen() {
  return (
    <ThemedView>
      <ThemedView>
        <ThemedText>New Text</ThemedText>
      </ThemedView>
      <ThemedText>Timeline Screen</ThemedText>
      <AnimatedThemedView>
        <ThemedText>Animated Themed View</ThemedText>
      </AnimatedThemedView>
    </ThemedView>
  );
}
