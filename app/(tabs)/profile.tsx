import ThemeSettings from '@/components/theme/ThemeSettings';
import ThemedText from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';

export default function ProfileScreen() {
  return (
    <ThemedView>
      <ThemedText>Profile Screen</ThemedText>
      <ThemeSettings />
    </ThemedView>
  );
}
