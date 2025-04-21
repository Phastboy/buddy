import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import useTheme from '@/utils/useTheme';

export default function ThemedTextInput({ style, ...props }: TextInputProps) {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    input: {
      color: colors.color,
      backgroundColor: colors.background,
      borderColor: colors.border,
      padding: 12,
      borderRadius: 8,
    },
    placeholderText: {
      color: colors.muted,
    },
  });

  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={styles.placeholderText.color}
      {...props}
    />
  );
}
