import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import useStyles from '@/utils/useStyles';

const ThemedScrollView = React.forwardRef<ScrollView, ScrollViewProps>(
  ({ style, ...props }, ref) => {
    const styles = useStyles((theme) => ({
      container: {
        backgroundColor: theme.background,
        color: theme.color,
      },
    }));

    return (
      <ScrollView ref={ref} style={[styles.container, style]} {...props} />
    );
  },
);

ThemedScrollView.displayName = 'ThemedScrollView';
export default ThemedScrollView;
