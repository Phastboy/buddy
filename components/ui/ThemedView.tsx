import useTheme from '@/utils/useTheme';
import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

const ThemedView = React.forwardRef<View, ViewProps>(
  ({ style, ...props }, ref) => {
    const { colors } = useTheme();
    const styles = StyleSheet.create({
      container: {
        backgroundColor: colors.background,
        color: colors.color,
      },
    });

    return <View ref={ref} style={[styles.container, style]} {...props} />;
  },
);

ThemedView.displayName = 'ThemedView';
export default ThemedView;
