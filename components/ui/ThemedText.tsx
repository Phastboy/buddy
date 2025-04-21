import React from 'react';
import { Text, TextProps } from 'react-native';
import useStyles from '@/utils/useStyles';

export default function ThemedText({ style, ...props }: TextProps) {
  const styles = useStyles((theme) => ({
    text: {
      color: theme.color,
    },
  }));

  return <Text style={[styles.text, style]} {...props} />;
}
