import React, { useRef } from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import Header from './ScrollAwareHeader';
import ScrollContent from './ScrollContent';
import { SmartHeaderProps } from '@/types';

const SmartHeader = ({
  headerHeight = 90,
  triggerDistance = 50,
  headerBackgroundColor = '#6a1b9a',
  headerText = 'Premium Header',
  headerTextColor = 'white',
  children,
}: SmartHeaderProps) => {
  const scrollY = useSharedValue(0);
  const lastDirection = useSharedValue(0);
  const scrollViewRef = useRef<Animated.ScrollView>(null);

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const scrollHandler = Animated.useAnimatedScrollHandle({
    onScroll: (event) => {
      const currentY = event.contentOffset.y;
      const isScrollingUp = currentY < scrollY.value;

      if (Math.abs(currentY - scrollY.value) > 3) {
        lastDirection.value = isScrollingUp ? 1 : -1;
      }

      scrollY.value = currentY;
    },
    onEndDrag: () => {
      if (scrollY.value > 0 && scrollY.value < headerHeight) {
        scrollViewRef.current?.scrollTo({
          y: lastDirection.value === 1 ? 0 : headerHeight,
          animated: true,
        });
      }
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <Header
        scrollY={scrollY}
        lastDirection={lastDirection}
        headerHeight={headerHeight}
        triggerDistance={triggerDistance}
        headerText={headerText}
        backgroundColor={headerBackgroundColor}
        textColor={headerTextColor}
        onPressTop={scrollToTop}
      />

      <ScrollContent
        scrollHandler={scrollHandler}
        headerHeight={headerHeight}
        innerRef={scrollViewRef}
      >
        {children}
      </ScrollContent>
    </View>
  );
};

export default SmartHeader;
