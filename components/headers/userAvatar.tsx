import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

const DEFAULT_AVATAR_URL =
  'https://avatars.githubusercontent.com/u/75147299?v=4';

export default function UserAvatar({ avatarUrl }: { avatarUrl?: string }) {
  if (!avatarUrl) {
    return <Ionicons name="person-circle-outline" size={40} color="gray" />;
  }
  return (
    <Image
      source={{ uri: avatarUrl }}
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
      }}
    />
  );
}
