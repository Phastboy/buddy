import TimelineHeader from '@/components/headers/TimelineHeader';
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
  } = scroll(40);

  const { colors } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <TimelineHeader
        scrollY={scrollY}
        isScrollingUp={isScrollingUp}
        headerHeight={headerHeight}
      />

      <AnimatedThemedScrollView
        contentContainerStyle={{ paddingTop: scrollContentPaddingTop }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
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
