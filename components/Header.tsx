import React, { ReactNode } from 'react';
import { StyleSheet, useWindowDimensions, ViewStyle } from 'react-native';
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
import Back from './Back';

type ScrollAwareHeaderProps = {
  children: ReactNode;
  scrollY: SharedValue<number>;
  isScrollingUp: SharedValue<boolean>;
  height?: number;
  fadeDistance?: number;
  style?: ViewStyle;
  showBackButton?: boolean;
};

const ScrollAwareHeader = ({
  children,
  scrollY,
  isScrollingUp,
  height = 90,
  fadeDistance = 50,
  style = {},
  showBackButton,
}: ScrollAwareHeaderProps) => {
  const { top } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { colors } = useTheme();

  const springConfig = React.useMemo(
    () => ({
      damping: 20,
      stiffness: 150,
    }),
    [],
  );

  const headerStyle = useAnimatedStyle(() => {
    if (scrollY.value <= 0) {
      return {
        opacity: 1,
        transform: [{ translateY: 0 }],
      };
    }

    if (isScrollingUp.value) {
      return {
        opacity: withSpring(1, springConfig),
        transform: [{ translateY: withSpring(0, springConfig) }],
      };
    }

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

  return (
    <AnimatedThemedView
      style={[
        styles.header,
        {
          height: height + top,
          paddingTop: top,
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
          borderBottomWidth: StyleSheet.hairlineWidth,
        },
        headerStyle,
        style,
      ]}
    >
      <AnimatedThemedView style={styles.contentContainer}>
        {showBackButton && <Back color={colors.color} />}
        <AnimatedThemedView style={[styles.childrenContainer, ,]}>
          {children}
        </AnimatedThemedView>
      </AnimatedThemedView>
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 16,
  },
  childrenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ScrollAwareHeader;
