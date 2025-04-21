import React from 'react';
import { View, ViewProps } from 'react-native';
import useStyles from '@/utils/useStyles';

const ThemedView = React.forwardRef<View, ViewProps>(
  ({ style, ...props }, ref) => {
    const styles = useStyles((theme) => ({
      container: {
        flex: 1,
        backgroundColor: theme.background,
        color: theme.color,
        justifyContent: 'center',
        alignItems: 'center',
      },
    }));

    return <View ref={ref} style={[styles.container, style]} {...props} />;
  },
);

ThemedView.displayName = 'ThemedView';
export default ThemedView;
