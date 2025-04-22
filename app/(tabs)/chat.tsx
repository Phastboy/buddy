import ThemedText from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';

export default function ChatScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedText>Chat Screen</ThemedText>
      <ThemedText>Additional content can go here.</ThemedText>
    </ThemedView>
  );
}
