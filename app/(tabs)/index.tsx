import ScrollAwareHeader from '@/components/Header';
import AnimatedThemedScrollView from '@/components/ui/AnimatedScrollView';
import ThemedText from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';
import useTheme from '@/utils/useTheme';
import React from 'react';
import { StyleSheet } from 'react-native';
import {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

const App = () => {
  const scrollY = useSharedValue(0);
  const isScrollingUp = useSharedValue(false);
  const prevScrollY = useSharedValue(0);
  const headerHeight = 100;

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

  const { colors } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <ScrollAwareHeader
        scrollY={scrollY}
        isScrollingUp={isScrollingUp}
        height={headerHeight}
        style={{ backgroundColor: colors.background }}
      >
        <ThemedText style={styles.headerText}>My Header</ThemedText>
      </ScrollAwareHeader>

      <AnimatedThemedScrollView
        contentContainerStyle={{ paddingTop: headerHeight }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* Your content here */}
        {Array.from({ length: 50 }).map((_, i) => (
          <ThemedView key={i} style={styles.item}>
            <ThemedText>Item {i + 1}</ThemedText>
          </ThemedView>
        ))}
      </AnimatedThemedScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;
