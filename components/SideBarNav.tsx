import useTheme from '@/utils/useTheme';
import ThemedView from './ui/ThemedView';
import { TouchableOpacity } from 'react-native';
import ThemedText from './ui/ThemedText';
import UserProfile from './UserProfile';
import { useRouter } from 'expo-router';

export default function SideBarNavigation() {
  const { colors } = useTheme();
  const router = useRouter();
  const navigateToUserProfile = () => {
    router.push('/user-profile');
  };
  const navigateToSettings = () => {
    router.push('/settings');
  };
  const navigateToHelp = () => {
    router.push('/help');
  };
  const user = {
    name: 'Hammed Anuoluwapo Pelumi',
    username: 'phastboy',
    avatarUrl: 'https://avatars.githubusercontent.com/u/75147299?v=4',
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      {/* sidebar navigation items */}
      {/* go to user profile */}
      <TouchableOpacity
        style={{ padding: 20 }}
        onPress={() => navigateToUserProfile()}
      >
        <UserProfile user={user} />
      </TouchableOpacity>
      {/* go to settings */}
      <TouchableOpacity
        style={{ padding: 20 }}
        onPress={() => navigateToSettings()}
      >
        <ThemedText>Settings</ThemedText>
      </TouchableOpacity>
      {/* go to help */}
      <TouchableOpacity
        style={{ padding: 20 }}
        onPress={() => navigateToHelp()}
      >
        <ThemedText>Help</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}
