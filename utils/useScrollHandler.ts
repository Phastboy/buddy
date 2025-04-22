import {
  useAnimatedScrollHandler,
  useSharedValue,
  SharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScrollHandlerReturn {
  scrollY: SharedValue<number>;
  isScrollingUp: SharedValue<boolean>;
  headerHeight: number;
  scrollHandler: ReturnType<typeof useAnimatedScrollHandler>;
  scrollContentPaddingTop: number;
}

export default function useScrollHandler(
  headerHeight: number = 80,
  treshold: number = 10,
): ScrollHandlerReturn {
  const scrollY = useSharedValue(0);
  const isScrollingUp = useSharedValue(false);
  const prevScrollY = useSharedValue(0);
  const { top } = useSafeAreaInsets();
  const scrollContentPaddingTop = headerHeight + top;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentY = event.contentOffset.y;

      if (Math.abs(currentY - prevScrollY.value) > treshold) {
        isScrollingUp.value = currentY < prevScrollY.value;
      }

      scrollY.value = currentY;
      prevScrollY.value = currentY;
    },
  });

  return {
    scrollY,
    isScrollingUp,
    headerHeight,
    scrollHandler,
    scrollContentPaddingTop,
  };
}
