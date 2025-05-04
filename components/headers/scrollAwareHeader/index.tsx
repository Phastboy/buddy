import React from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { snapHeader } from './animations';
import { StickySnapHeaderProps } from './type';
import { styles } from './styles';
import { useThemeColors } from '@/utils/useThemeColors';
import { View } from '@/components/Themed';

export const StickySnapHeader: React.FC<StickySnapHeaderProps> = ({
  height = 64,
  headerStyle,
  headerChildren,
  children,
}) => {
  const headerTranslateY = useSharedValue(0);
  const prevScrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const y = event.contentOffset.y;
      const deltaY = y - prevScrollY.value;
      headerTranslateY.value = Math.max(
        Math.min(headerTranslateY.value - deltaY, 0),
        -height,
      );
      prevScrollY.value = y;
    },
    onEndDrag: () => {
      headerTranslateY.value = snapHeader(headerTranslateY.value, height);
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const colors = useThemeColors();
  return (
    <View style={[styles.container]}>
      <Animated.View
        style={[
          styles.header,
          { height, backgroundColor: colors.background },
          headerStyle,
          headerAnimatedStyle,
        ]}
        pointerEvents="box-none"
      >
        {headerChildren}
      </Animated.View>

      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        contentContainerStyle={{
          paddingTop: height,
          backgroundColor: colors.background,
        }}
      >
        {children}
      </Animated.ScrollView>
    </View>
  );
};
