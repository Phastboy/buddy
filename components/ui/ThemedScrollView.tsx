import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import useStyles from '@/utils/useStyles';

export default function ThemedScrollView({ style, ...props }: ScrollViewProps) {
  const styles = useStyles((theme) => ({
    container: {
      backgroundColor: theme.background,
    },
  }));

  return <ScrollView style={[styles.container, style]} {...props} />;
}
