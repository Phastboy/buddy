import React from 'react';
import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native';
import useTheme from '@/utils/useTheme';

const ThemedScrollView = React.forwardRef<ScrollView, ScrollViewProps>(
  ({ style, ...props }, ref) => {
    const { colors } = useTheme();
    const styles = StyleSheet.create({
      container: {
        backgroundColor: colors.background,
        color: colors.color,
      },
    });

    return (
      <ScrollView ref={ref} style={[styles.container, style]} {...props} />
    );
  },
);

ThemedScrollView.displayName = 'ThemedScrollView';
export default ThemedScrollView;
