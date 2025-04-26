import { withSpring, SharedValue } from 'react-native-reanimated';
import { SpringConfig } from 'react-native-reanimated/lib/typescript/animation/springUtils';

/**
 * Gets a reusable spring config for smooth header animation
 */
export const getSpringConfig = (): SpringConfig => ({
  damping: 20,
  stiffness: 150,
});

/**
 * Animated style return type
 */
interface HeaderAnimationStyle {
  opacity: number;
  transform: Array<{ translateY: number }>;
}

/**
 * Calculates the header animation based on scroll behavior
 */
export const getHeaderAnimationStyle = (
  scrollY: SharedValue<number>,
  isScrollingUp: SharedValue<boolean>,
  springConfig: SpringConfig,
  height: number,
): HeaderAnimationStyle => {
  'worklet';

  if (scrollY.value <= 0) {
    return {
      opacity: 1,
      transform: [{ translateY: 0 }],
    };
  }

  if (!isScrollingUp.value) {
    // Scrolling down → show header
    return {
      opacity: withSpring(1, springConfig),
      transform: [{ translateY: withSpring(0, springConfig) }],
    };
  } else {
    // Scrolling up → hide header
    return {
      opacity: withSpring(0, springConfig),
      transform: [{ translateY: withSpring(-height, springConfig) }],
    };
  }
};
