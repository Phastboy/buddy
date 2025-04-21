import { StyleSheet } from 'react-native';
import useTheme from '@/utils/useTheme';

// 1. Strongly typed style generator function
type StyleGenerator<T extends StyleSheet.NamedStyles<T>> = (
  theme: ReturnType<typeof useTheme>, // Full theme object (colors + context)
) => T;

// 2. Hook with automatic Theme dependency
export default function useStyles<T extends StyleSheet.NamedStyles<T>>(
  styleGenerator: StyleGenerator<T>,
) {
  const theme = useTheme();
  return StyleSheet.create(styleGenerator(theme));
}
