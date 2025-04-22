import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ColorValue, Pressable, StyleSheet } from 'react-native';
import useTheme from '@/utils/useTheme';

type BackProps = {
  color?: ColorValue;
  size?: number;
};

export default function Back({ color, size = 24 }: BackProps) {
  const router = useRouter();
  const { colors } = useTheme();
  const iconColor = color || colors.color;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.6 : 1 },
      ]}
      onPress={() => router.back()}
      hitSlop={16}
    >
      <Ionicons name="arrow-back" size={size} color={iconColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginRight: 8,
    borderRadius: 20,
  },
});
