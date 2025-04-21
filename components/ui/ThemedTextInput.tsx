import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import useStyles from '@/utils/useStyles';

export default function ThemedTextInput({ style, ...props }: TextInputProps) {
  const styles = useStyles((theme) => ({
    input: {
      color: theme.color,
      backgroundColor: theme.background,
      borderColor: theme.border,
      padding: 12,
      borderRadius: 8,
    },
    placeholderText: {
      color: theme.muted,
    },
  }));

  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={styles.placeholderText.color}
      {...props}
    />
  );
}
