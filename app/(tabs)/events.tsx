import ScrollAwareHeader from '@/components/Header';
import AnimatedThemedScrollView from '@/components/ui/AnimatedScrollView';
import ThemedText from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';
import scroll from '@/utils/useScrollHandler';
import useTheme from '@/utils/useTheme';
import React from 'react';
import { StyleSheet } from 'react-native';

const App = () => {
  const {
    scrollY,
    isScrollingUp,
    headerHeight,
    scrollHandler,
    scrollContentPaddingTop,
  } = scroll();

  const { colors } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <ScrollAwareHeader
        scrollY={scrollY}
        showBackButton
        isScrollingUp={isScrollingUp}
        height={headerHeight}
        style={{ backgroundColor: colors.background }}
      >
        <ThemedText style={styles.headerText}>My Header</ThemedText>
      </ScrollAwareHeader>

      <AnimatedThemedScrollView
        contentContainerStyle={{ paddingTop: scrollContentPaddingTop }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
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
