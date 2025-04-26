import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getSpringConfig, getHeaderAnimationStyle } from './animations';
import { useThemeColors } from '@/utils/useThemeColors';
import { ScrollAwareHeaderProps } from './type';
import { styles } from './styles';

/**
 * A header component that responds to scroll events with animations
 * @component
 * @param {ScrollAwareHeaderProps} props - Component props
 * @returns {React.ReactElement} Animated header component
 *
 * @example
 * <ScrollAwareHeader
 *   scrollY={scrollY}
 *   isScrollingUp={isScrollingUp}
 *   height={100}
 * >
 *   <Text>My Header</Text>
 * </ScrollAwareHeader>
 */
const ScrollAwareHeader = ({
  children,
  scrollY,
  isScrollingUp,
  height,
  containerStyle = {},
  childrenContainerStyle = {},
  showBackButton,
}: ScrollAwareHeaderProps) => {
  const { top } = useSafeAreaInsets();
  const colors = useThemeColors();
  const router = useRouter();

  const springConfig = React.useMemo(getSpringConfig, []);

  const headerStyle = useAnimatedStyle(() =>
    getHeaderAnimationStyle(scrollY, isScrollingUp, springConfig, height),
  );

  return (
    <Animated.View
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
        containerStyle,
      ]}
    >
      <Animated.View style={[styles.childrenContainer, childrenContainerStyle]}>
        {showBackButton && (
          <Ionicons
            name="arrow-back"
            size={24}
            color={colors.text}
            onPress={() => router.back()}
          />
        )}
        {children}
      </Animated.View>
    </Animated.View>
  );
};

export default ScrollAwareHeader;
