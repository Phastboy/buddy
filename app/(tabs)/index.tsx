import ScreenHeader from '@/components/ScreenHeader';
import useTheme from '@/hooks/useTheme';
import { useRef } from 'react';
import { Animated, Text, View } from 'react-native';

export default function TimelineScreen() {
  const { colors } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        { backgroundColor: colors.background },
      ]}
    >
      <ScreenHeader scrollY={scrollY} title="Timeline" />
      <Text>Timeline Screen</Text>
    </View>
  );
}
