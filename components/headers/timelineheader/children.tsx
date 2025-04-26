import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';
import { Image, Pressable } from 'react-native';
import UserAvatar from '../userAvatar';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/utils/useThemeColors';

/**
 * Component that renders a button to open the navigation drawer
 */
function DrawerOpener(): React.ReactElement {
  const navigator = useNavigation<DrawerNavigationProp<ParamListBase>>();
  return (
    <Pressable onPress={() => navigator.openDrawer()}>
      <UserAvatar />
    </Pressable>
  );
}

/**
 * Component that renders a notification icon button
 */
function NotificationIcon(): React.ReactElement {
  const { inactiveIcon } = useThemeColors();
  const router = useRouter();
  return (
    <Ionicons
      name="notifications-outline"
      size={24}
      color={inactiveIcon}
      onPress={() => router.push('/notifications')}
    />
  );
}

/**
 * Component that renders the app logo
 */
function Logo(): React.ReactElement {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push('/')}>
      <Image
        source={require('../../../assets/images/logo.png')}
        style={{ width: 40, height: 40, resizeMode: 'contain' }}
      />
    </Pressable>
  );
}

export { DrawerOpener, Logo, NotificationIcon };
