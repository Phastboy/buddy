import {
  ThemedScrollView,
  ThemedText,
  ThemedView,
  ThemedCard,
} from '@/components/Themed';
import ThemeSettings from '@/components/settings/ThemeSettings';
import { StyleSheet } from 'react-native';

export default function Profile() {
  return (
    <ThemedScrollView contentContainerStyle={styles.content}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Profile</ThemedText>
        <ThemedText style={styles.subtitle} secondary>
          Customize your app experience
        </ThemedText>
      </ThemedView>

      <ThemedText style={styles.sectionLabel}>Appearance</ThemedText>
      <ThemeSettings />

      <ThemedText style={styles.sectionLabel}>Theme Preview</ThemedText>
      <ThemedCard style={styles.previewCard}>
        <ThemedText style={styles.previewText}>Sample Text</ThemedText>
        <ThemedView style={styles.primaryButton}>
          <ThemedText color="#FFF">Primary Button</ThemedText>
        </ThemedView>
        <ThemedView style={styles.secondaryButton}>
          <ThemedText color="#FFF">Secondary Button</ThemedText>
        </ThemedView>
      </ThemedCard>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginTop: 24,
    textTransform: 'uppercase',
    opacity: 0.6,
  },
  previewCard: {
    marginBottom: 24,
  },
  previewText: {
    marginBottom: 12,
  },
  primaryButton: {
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButton: {
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
