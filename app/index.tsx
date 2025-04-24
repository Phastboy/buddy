import ThemedButton from '@/components/ui/ThemedButton';
import ThemedText from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function GettingStarted() {
  const navigate = useRouter().push;
  return (
    <ThemedView style={styles.container}>
      <ThemedButton onPress={() => navigate('/login')}>
        <ThemedText>get started</ThemedText>
      </ThemedButton>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
