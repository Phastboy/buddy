import { SharedValue, useSharedValue } from 'react-native-reanimated';
import { useAnimatedScrollHandler } from 'react-native-reanimated';

/**
 * Configuration options for the scroll-aware header hook
 */
interface ScrollAwareHeaderConfig {
  scrollEventThrottle?: number;
  initialScrollY?: number;
}

/**
 * Scroll-aware header return type
 */
interface ScrollAwareHeaderReturn {
  scrollY: SharedValue<number>;
  isScrollingUp: SharedValue<boolean>;
  scrollDirection: SharedValue<'up' | 'down' | null>;
  scrollHandler: (event: any) => void;
  scrollEventThrottle: number;
}

/**
 * Custom hook that provides scroll awareness for header components
 * @param {ScrollAwareHeaderConfig} [config] - Optional configuration object
 * @returns {ScrollAwareHeaderReturn} Scroll-aware header utilities
 * @property {SharedValue<number>} scrollY - Current scroll position Y value
 * @property {SharedValue<boolean>} isScrollingUp - Whether user is scrolling up
 * @property {SharedValue<'up'|'down'|null>} scrollDirection - Current scroll direction
 * @property {Function} scrollHandler - Scroll event handler for Animated.ScrollView
 * @property {number} scrollEventThrottle - Throttle rate for scroll events
 */
export const useScrollAwareHeader = (
  config?: ScrollAwareHeaderConfig,
): ScrollAwareHeaderReturn => {
  const scrollY = useSharedValue(config?.initialScrollY || 0);
  const isScrollingUp = useSharedValue(false);
  const scrollDirection = useSharedValue<'up' | 'down' | null>(null);
  const prevScrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentScrollY = event.contentOffset.y;
      const diff = currentScrollY - prevScrollY.value;

      if (Math.abs(diff) > 2) {
        isScrollingUp.value = diff > 0;
      }

      prevScrollY.value = currentScrollY;
      scrollY.value = currentScrollY;
    },
  });

  return {
    scrollY,
    isScrollingUp,
    scrollDirection,
    scrollHandler,
    scrollEventThrottle: config?.scrollEventThrottle || 16,
  };
};
