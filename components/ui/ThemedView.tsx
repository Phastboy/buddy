import React from 'react';
import { View, ViewProps } from 'react-native';
import useStyles from '@/utils/useStyles';

export default function ThemedView({ style, ...props }: ViewProps) {
  const styles = useStyles((theme) => ({
    container: {
      backgroundColor: theme.background,
      color: theme.color,
    },
  }));

  return <View style={[styles.container, style]} {...props} />;
}
