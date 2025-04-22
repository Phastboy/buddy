import React, { ReactNode } from 'react';
import { StyleSheet, useWindowDimensions, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  useAnimatedStyle,
  interpolate,
  withSpring,
  Extrapolation,
  SharedValue,
  StyleProps,
} from 'react-native-reanimated';
import AnimatedThemedView from './ui/AnimatedView';
import useTheme from '@/utils/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Back from './Back';
import { useRouter } from 'expo-router';

type ScrollAwareHeaderProps = {
  children: ReactNode;
  scrollY: SharedValue<number>;
  isScrollingUp: SharedValue<boolean>;
  height?: number;
  fadeDistance?: number;
  containerStyle?: StyleProps;
  showBackButton?: boolean;
  contentContainerStyle?: StyleProps;
  childrenContainerStyle?: StyleProps;
};

const ScrollAwareHeader = ({
  children,
  scrollY,
  isScrollingUp,
  height = 90,
  fadeDistance = 50,
  containerStyle = {},
  contentContainerStyle = {},
  childrenContainerStyle = {},
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
        containerStyle,
      ]}
    >
      <AnimatedThemedView
        style={[styles.contentContainer, contentContainerStyle]}
      >
        {showBackButton && <Back color={colors.color} />}
        <AnimatedThemedView
          style={[styles.childrenContainer, childrenContainerStyle]}
        >
          {children}
        </AnimatedThemedView>
      </AnimatedThemedView>
    </AnimatedThemedView>
  );
};

export const TimelineHeader = ({
  scrollY,
  isScrollingUp,
}: {
  scrollY: SharedValue<number>;
  isScrollingUp: SharedValue<boolean>;
}) => {
  const router = useRouter();
  const { colors } = useTheme();
  const handleUserIconPress = () => {
    // Handle user icon press
  };

  const handleNotificationIconPress = () => {
    router.push('/notifications');
  };

  return (
    <ScrollAwareHeader
      scrollY={scrollY}
      isScrollingUp={isScrollingUp}
      height={90}
      fadeDistance={50}
      contentContainerStyle={{ justifyContent: 'space-between' }}
    >
      {/* User Icon */}
      <Ionicons
        name="person-circle-outline"
        size={24}
        color={colors.color}
        onPress={handleUserIconPress}
      />

      {/* Title */}
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.color }}>
          Timeline
        </Text>
      </View>

      {/* Notification Icon */}
      <Ionicons
        name="notifications-outline"
        size={24}
        color={colors.color}
        onPress={handleNotificationIconPress}
      />
    </ScrollAwareHeader>
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
