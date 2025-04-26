import {
  interpolate,
  Extrapolation,
  withSpring,
  SharedValue,
} from 'react-native-reanimated';
import { SpringConfig } from 'react-native-reanimated/lib/typescript/animation/springUtils';

/**
 * Gets the spring animation configuration for header animations
 * @returns {SpringConfig} Spring animation configuration
 */
export const getSpringConfig = (): SpringConfig => ({
  damping: 20,
  stiffness: 150,
});

/**
 * getHeaderAnimationStyle return type
 */
interface HeaderAnimationStyle {
  opacity: number;
  transform: Array<{ translateY: number }>;
}

/**
 * Calculates the animated style for the header based on scroll position
 * @param {SharedValue<number>} scrollY - Current scroll position Y value
 * @param {SharedValue<boolean>} isScrollingUp - Whether user is scrolling up
 * @param {SpringConfig} springConfig - Spring animation configuration
 * @param {number} fadeDistance - Distance to fade out the header (in pixels)
 * @param {number} height - Height of the header (in pixels)
 * @returns {HeaderAnimationStyle} Animated style properties
 * @property {number} opacity - Calculated opacity value
 * @property {Array} transform - Array containing translateY transform
 */
export const getHeaderAnimationStyle = (
  scrollY: SharedValue<number>,
  isScrollingUp: SharedValue<boolean>,
  springConfig: SpringConfig,
  fadeDistance: number,
  height: number,
): HeaderAnimationStyle => {
  'worklet';

  if (scrollY.value <= 0) {
    return {
      opacity: 1,
      transform: [{ translateY: 0 }],
    };
  }

  const progress = interpolate(
    scrollY.value,
    [0, fadeDistance],
    [0, 1],
    Extrapolation.CLAMP,
  );

  if (!isScrollingUp.value) {
    return {
      opacity: withSpring(1, springConfig),
      transform: [{ translateY: withSpring(0, springConfig) }],
    };
  }

  return {
    opacity: withSpring(1 - progress, springConfig),
    transform: [
      {
        translateY: withSpring(-height * progress, springConfig),
      },
    ],
  };
};
