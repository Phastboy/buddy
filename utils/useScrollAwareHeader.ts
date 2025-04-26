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
 * Custom hook to track scroll for animating headers
 */
export const useScrollAwareHeader = (
  config?: ScrollAwareHeaderConfig,
): ScrollAwareHeaderReturn => {
  const scrollY = useSharedValue(config?.initialScrollY || 0);
  const isScrollingUp = useSharedValue(false);
  const scrollDirection = useSharedValue<'up' | 'down' | null>(null);
  const prevScrollY = useSharedValue(0);

  const SCROLL_THRESHOLD = 10;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentScrollY = event.contentOffset.y;
      const diff = currentScrollY - prevScrollY.value;

      if (Math.abs(diff) > SCROLL_THRESHOLD) {
        isScrollingUp.value = diff > 0;
        scrollDirection.value = diff > 0 ? 'up' : 'down';
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
