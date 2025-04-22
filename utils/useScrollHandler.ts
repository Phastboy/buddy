import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

export default function scroll(headerHeight: number = 80) {
  const scrollY = useSharedValue(0);
  const isScrollingUp = useSharedValue(false);
  const prevScrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentY = event.contentOffset.y;

      // Determine scroll direction with threshold to prevent flickering
      if (Math.abs(currentY - prevScrollY.value) > 3) {
        isScrollingUp.value = currentY < prevScrollY.value;
      }

      scrollY.value = currentY;
      prevScrollY.value = currentY;
    },
  });

  return { scrollY, isScrollingUp, headerHeight, scrollHandler };
}
