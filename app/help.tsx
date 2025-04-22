import { StyleSheet } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';

export default function Help() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Help</ThemedText>
      <ThemedText style={styles.text}>
        This is the help screen. Here you can find information about how to use
        the app.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
