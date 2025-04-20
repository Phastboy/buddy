import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { useRef } from 'react';

type FABProps = {
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'small' | 'medium' | 'large';
};

export default function FAB({
  onPress,
  icon = 'add',
  position = 'bottom-right',
  size = 'medium',
}: FABProps) {
  const { colors } = useTheme();
  const scaleValue = useRef(new Animated.Value(1)).current;

  const sizeMap = {
    small: 40,
    medium: 56,
    large: 64,
  };

  const positionStyles = {
    'bottom-right': { bottom: 16, right: 16 },
    'bottom-left': { bottom: 16, left: 16 },
    'top-right': { top: 16, right: 16 },
    'top-left': { top: 16, left: 16 },
  };

  const handlePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.9,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors.primary,
          width: sizeMap[size],
          height: sizeMap[size],
          borderRadius: sizeMap[size] / 2,
          transform: [{ scale: scaleValue }],
          ...positionStyles[position],
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
        style={styles.button}
      >
        <Ionicons name={icon} size={sizeMap[size] / 2} color={colors.text} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
