import { AppTheme, DarkTheme, DefaultTheme } from '@react-navigation/native';

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
