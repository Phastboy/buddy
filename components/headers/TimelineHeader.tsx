import { Ionicons } from '@expo/vector-icons';
import ThemedText from '../ui/ThemedText';
import ThemedView from '../ui/ThemedView';
import ScrollAwareHeader from './ScrollAwareHeader';
import { SharedValue } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import useTheme from '@/utils/useTheme';
import { useState } from 'react';
import SideBarNavigation from '../SideBarNav';
import { Image, Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function TimelineHeader({
  scrollY,
  isScrollingUp,
  headerHeight = 40,
}: {
  scrollY: SharedValue<number>;
  isScrollingUp: SharedValue<boolean>;
  headerHeight?: number;
}) {
  const router = useRouter();
  const { colors } = useTheme();
  const [isSideNavVisible, setSideNavVisible] = useState(false);

  const handleUserIconPress = () => {
    setSideNavVisible(!isSideNavVisible);
  };

  const handleNotificationIconPress = () => {
    router.push('/notifications');
  };

  return (
    <>
      <ScrollAwareHeader
        scrollY={scrollY}
        isScrollingUp={isScrollingUp}
        height={headerHeight}
        fadeDistance={50}
        childrenContainerStyle={{ justifyContent: 'space-between' }}
      >
        {/* User Icon */}
        <Ionicons
          name="person-circle-outline"
          size={24}
          color={colors.color}
          onPress={handleUserIconPress}
        />

        {/* Title */}
        <ThemedView style={{ flex: 1, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => router.push('/')}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={{ width: 100, height: '100%', resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        </ThemedView>

        {/* Notification Icon */}
        <Ionicons
          name="notifications-outline"
          size={24}
          color={colors.color}
          onPress={handleNotificationIconPress}
        />
      </ScrollAwareHeader>
      {isSideNavVisible && <SideBarNavigation />}
    </>
  );
}
