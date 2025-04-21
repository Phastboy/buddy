import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import {
  useAnimatedStyle,
  interpolate,
  withSpring,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';
import AnimatedThemedView from './ui/AnimatedView';

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
        opacity: withSpring(1, { damping: 16 }),
        transform: [{ translateY: withSpring(0, { damping: 16 }) }],
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
      opacity: withSpring(1 - progress, { damping: 16 }),
      transform: [
        {
          translateY: withSpring(-height * progress, { damping: 16 }),
        },
      ],
    };
  });

  return (
    <AnimatedThemedView style={[styles.header, { height }, headerStyle, style]}>
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
  },
});

export default ScrollAwareHeader;
