import { useThemeColors } from '@/utils/useThemeColors';
import { Ionicons } from '@expo/vector-icons';
import { Image, ImageStyle } from 'react-native';

const DEFAULT_AVATAR_URL =
  'https://avatars.githubusercontent.com/u/75147299?v=4';

export default function UserAvatar({
  avatarUrl,
  style,
}: {
  avatarUrl?: string;
  style?: ImageStyle;
}) {
  const { inactiveIcon } = useThemeColors();
  if (!avatarUrl) {
    return (
      <Ionicons name="person-circle-outline" size={40} color={inactiveIcon} />
    );
  }
  return (
    <Image
      source={{ uri: avatarUrl }}
      style={[
        {
          width: 40,
          height: 40,
          borderRadius: 20,
        },
        style,
      ]}
    />
  );
}
