import React from 'react';
import {
  View,
  ScrollView,
  Text,
  ViewProps,
  ScrollViewProps,
  TextProps,
} from 'react-native';
import useTheme from '@/hooks/useTheme';

// Themed View Component
export function ThemedView(props: ViewProps) {
  const { colors } = useTheme();
  return (
    <View
      {...props}
      style={[{ backgroundColor: colors.background }, props.style]}
    />
  );
}

// Themed ScrollView Component
export function ThemedScrollView(props: ScrollViewProps) {
  const { colors } = useTheme();
  return (
    <ScrollView
      {...props}
      style={[{ backgroundColor: colors.background }, props.style]}
      contentContainerStyle={[props.contentContainerStyle]}
    />
  );
}

// Themed Text Component
interface ThemedTextProps extends TextProps {
  color?: string;
  secondary?: boolean;
}

export function ThemedText({
  color,
  secondary,
  style,
  ...props
}: ThemedTextProps) {
  const { colors } = useTheme();
  const textColor = color
    ? color
    : secondary
      ? colors.textSecondary || colors.text
      : colors.text;

  return <Text {...props} style={[{ color: textColor }, style]} />;
}

// Themed Card Component
export function ThemedCard(props: ViewProps) {
  const { colors } = useTheme();
  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.border,
          padding: 16,
        },
        props.style,
      ]}
    />
  );
}
