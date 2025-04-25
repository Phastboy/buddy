import { useAppTheme } from '@/utils/useTheme';
import { AppTheme, DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

/**
 * Extends the React Navigation Theme to include custom color properties
 * @module '@react-navigation/native'
 */
declare module '@react-navigation/native' {
  export interface AppTheme extends Theme {
    colors: Theme['colors'] & {
      muted: string;
      activeIcon: string;
      inactiveIcon: string;
    };
  }
}

/**
 * Light theme color palette
 * @type {AppTheme['colors']}
 * @property {string} muted - Muted background color (#F3F4F6)
 * @property {string} activeIcon - Color for active icons (black)
 * @property {string} inactiveIcon - Color for inactive icons (black)
 */
export const lightColors: AppTheme['colors'] = {
  ...DefaultTheme.colors,
  muted: '#F3F4F6',
  activeIcon: 'black',
  inactiveIcon: 'black',
};

/**
 * Dark theme color palette
 * @type {AppTheme['colors']}
 * @property {string} muted - Muted background color (#1F2937)
 * @property {string} activeIcon - Color for active icons (white)
 * @property {string} inactiveIcon - Color for inactive icons (white)
 */
export const darkColors: AppTheme['colors'] = {
  ...DarkTheme.colors,
  muted: '#1F2937',
  activeIcon: 'white',
  inactiveIcon: 'white',
};

/**
 * Hook to access theme colors based on current theme
 * @returns {AppTheme['colors']} The current theme's color palette
 * @example
 * const colors = useThemeColors();
 * <View style={{ backgroundColor: colors.primary }} />
 */
export function useThemeColors() {
  const { theme } = useAppTheme();
  return theme.colors;
}