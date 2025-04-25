import { AppTheme } from '@react-navigation/native';
import { useAppTheme } from './useTheme';

/**
 * Hook to access theme colors based on current theme
 * @returns {AppTheme['colors']} The current theme's color palette
 * @example
 * const colors = useThemeColors();
 * <View style={{ backgroundColor: colors.primary }} />
 */
export function useThemeColors(): AppTheme['colors'] {
  const { theme } = useAppTheme();
  return theme.colors;
}
