import TimelineHeader from '@/components/headers/timelineheader';
import { Text, View } from '@/components/Themed';
import { useScrollAwareHeader } from '@/utils/useScrollAwareHeader';
import { useThemeColors } from '@/utils/useThemeColors';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

const App = () => {
  const {
    headerHeight,
    scrollHandler,
    scrollEventThrottle,
    scrollY,
    isScrollingUp,
  } = useScrollAwareHeader({
    headerHeight: 40,
  });
  const colors = useThemeColors();
  return (
    <View style={[styles.container, { paddingTop: headerHeight }]}>
      <TimelineHeader
        headerHeight={headerHeight}
        scrollY={scrollY}
        isScrollingUp={isScrollingUp}
      />

      <Animated.ScrollView
        style={{ backgroundColor: colors.background }}
        onScroll={scrollHandler}
        scrollEventThrottle={scrollEventThrottle}
      >
        {[...Array(50)].map((_, i) => (
          <Text key={i} style={styles.item}>
            Item {i + 1}
          </Text>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingTop: 120,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;
