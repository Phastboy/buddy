import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import useTheme from '@/utils/useTheme';

type TextVariant = 'title' | 'subtitle' | 'body' | 'caption' | 'info';

interface ThemedTextProps extends TextProps {
  variant?: TextVariant;
}

const ThemedText = React.forwardRef<Text, ThemedTextProps>(
  ({ style, variant = 'body', ...props }, ref) => {
    const { colors } = useTheme();
    const fontSizeMap: Record<TextVariant, number> = {
      title: 24,
      subtitle: 18,
      body: 14,
      caption: 12,
      info: 12,
    };
    const styles = StyleSheet.create({
      text: {
        fontSize: fontSizeMap[variant],
        fontWeight: variant === 'title' ? 'bold' : 'normal',
        color: colors.color,
      },
    });

    return <Text ref={ref} style={[styles.text, style]} {...props} />;
  },
);

ThemedText.displayName = 'ThemedText';
export default ThemedText;
