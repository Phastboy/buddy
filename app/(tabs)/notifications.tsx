import ScreenHeader from '@/components/ScreenHeader';
import useTheme from '@/hooks/useTheme';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Animated, Text, View } from 'react-native';

export default function NotificationScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const handleBackPress = () => {
    router.back();
  };
  return (
    <View
      style={[
        { backgroundColor: colors.background },
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      <ScreenHeader
        scrollY={scrollY}
        title="Notifications"
        backButton
        onBackPress={handleBackPress}
      />
      <Text>Notification Screen</Text>
    </View>
  );
}
