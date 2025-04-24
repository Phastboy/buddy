import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

export default function UserAvatar({
  avatarUrl = 'https://avatars.githubusercontent.com/u/75147299?v=4',
}: {
  avatarUrl?: string;
}) {
  if (!avatarUrl) {
    return <Ionicons name="person-circle-outline" size={20} color="gray" />;
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
