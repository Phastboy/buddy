import useTheme from '@/utils/useTheme';
import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

const ThemedText = React.forwardRef<Text, TextProps>(
  ({ style, ...props }, ref) => {
    const { colors } = useTheme();
    const styles = StyleSheet.create({
      text: {
        color: colors.color,
      },
    });

    return <Text ref={ref} style={[styles.text, style]} {...props} />;
  },
);

ThemedText.displayName = 'ThemedText';
export default ThemedText;
