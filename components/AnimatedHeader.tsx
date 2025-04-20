import React from 'react';
import {
  Animated,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import useTheme from '@/hooks/useTheme';
import { ThemedText } from './Themed';

interface AnimatedHeaderProps {
  scrollY: Animated.Value;
  title?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  leftAction?: () => void;
  rightAction?: () => void;
  height?: number;
  minHeight?: number;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  showBorder?: boolean;
  withSafeArea?: boolean;
}

export default function AnimatedHeader({
  scrollY,
  title = '',
  left,
  right,
  leftAction,
  rightAction,
  height = 120,
  minHeight = 56,
  containerStyle,
  titleStyle,
  showBorder = true,
  withSafeArea = true,
}: AnimatedHeaderProps) {
  const { colors } = useTheme();

  // Calculate header height based on scroll position
  const headerHeight = scrollY.interpolate({
    inputRange: [0, height - minHeight],
    outputRange: [height, minHeight],
    extrapolate: 'clamp',
  });

  // Calculate title opacity based on scroll
  const titleOpacity = scrollY.interpolate({
    inputRange: [0, (height - minHeight) / 2, height - minHeight],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  // Calculate title scale based on scroll
  const titleScale = scrollY.interpolate({
    inputRange: [0, height - minHeight],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  // Calculate title position based on scroll
  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, height - minHeight],
    outputRange: [0, -10],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          height: headerHeight,
          borderBottomWidth: showBorder ? StyleSheet.hairlineWidth : 0,
          borderBottomColor: colors.border,
          paddingTop: withSafeArea
            ? Platform.OS === 'android'
              ? StatusBar.currentHeight
              : 0
            : 0,
        },
        containerStyle,
      ]}
    >
      <TouchableOpacity
        style={styles.side}
        onPress={leftAction}
        activeOpacity={leftAction ? 0.6 : 1}
      >
        {left}
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.titleContainer,
          {
            opacity: titleOpacity,
            transform: [{ scale: titleScale }, { translateY: titleTranslateY }],
          },
        ]}
      >
        <ThemedText
          style={[styles.title, { color: colors.text }, titleStyle]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </ThemedText>
      </Animated.View>

      <TouchableOpacity
        style={styles.side}
        onPress={rightAction}
        activeOpacity={rightAction ? 0.6 : 1}
      >
        {right}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  side: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});
