import { Text } from '@/components/Themed';
import { useThemeColors } from '@/utils/useThemeColors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export function Title() {
  return <Text>Notifications</Text>;
}

interface BackButtonProps {
  size?: number;
}

export function BackButton({ size = 24 }: BackButtonProps) {
  const { inactiveIcon } = useThemeColors();
  const router = useRouter();
  return (
    <Ionicons
      name="arrow-back"
      onPress={() => router.back()}
      size={size}
      color={inactiveIcon}
    />
  );
}
