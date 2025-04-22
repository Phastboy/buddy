import useTheme from '@/utils/useTheme';
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';

const ThemedButton = React.forwardRef<View, TouchableOpacityProps>(
  ({ style, children, ...props }, ref) => {
    const { colors } = useTheme();
    const styles = StyleSheet.create({
      button: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
      },
    });

    return (
      <TouchableOpacity ref={ref} style={[styles.button, style]} {...props}>
        {children}
      </TouchableOpacity>
    );
  },
);

export default ThemedButton;
