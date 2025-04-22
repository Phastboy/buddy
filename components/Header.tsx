import React, { ReactNode } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import {
  useAnimatedStyle,
  interpolate,
  withSpring,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';
import AnimatedThemedView from './ui/AnimatedView';
import useTheme from '@/utils/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ScrollAwareHeaderProps = {
  children: ReactNode;
  scrollY: SharedValue<number>;
  isScrollingUp: SharedValue<boolean>;
  height?: number;
  fadeDistance?: number;
  style?: object;
};

const ScrollAwareHeader = ({
  children,
  scrollY,
  isScrollingUp,
  height = 90,
  fadeDistance = 50,
  style = {},
}: ScrollAwareHeaderProps) => {
  const { top } = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();
  const springConfig = { damping: 20, stiffness: 150 };
  const headerStyle = useAnimatedStyle(() => {
    // Always show if at top or when overscrolling (negative values)
    if (scrollY.value <= 0) {
      return {
        opacity: 1,
        transform: [{ translateY: 0 }],
      };
    }

    // Show when scrolling up
    if (isScrollingUp.value) {
      return {
        opacity: withSpring(1, springConfig),
        transform: [{ translateY: withSpring(0, springConfig) }],
      };
    }

    // Hide when scrolling down
    const progress = interpolate(
      scrollY.value,
      [0, fadeDistance],
      [0, 1],
      Extrapolation.CLAMP,
    );

    return {
      opacity: withSpring(1 - progress, springConfig),
      transform: [
        {
          translateY: withSpring(-height * progress, springConfig),
        },
      ],
    };
  });

  const { colors } = useTheme();

  return (
    <AnimatedThemedView
      style={[
        styles.header,
        { height },
        { paddingTop: top },
        { backgroundColor: colors.background },
        headerStyle,
        style,
        { borderBottomColor: colors.muted },
      ]}
    >
      {children}
    </AnimatedThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
});

export default ScrollAwareHeader;
