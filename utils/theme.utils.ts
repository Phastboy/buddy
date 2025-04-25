import { darkColors, lightColors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppTheme, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { ColorSchemeName } from 'react-native';
import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from 'expo-status-bar';

/**
 * Theme mode options
 */
export type ThemeMode = 'light' | 'dark' | 'system';
const STORAGE_KEY = 'THEME_PREFERENCE';

/**
 * Gets the appropriate theme based on mode and system preference
 * @param {ThemeMode} mode - Current theme mode preference
 * @param {ColorSchemeName} systemScheme - System color scheme
 * @returns {AppTheme} The complete theme object
 * @example
 * const theme = getTheme('dark', 'dark');
 */
export const getTheme = (
  mode: ThemeMode,
  systemScheme: ColorSchemeName,
): AppTheme => {
  return mode === 'system'
    ? systemScheme === 'dark'
      ? { ...DarkTheme, colors: darkColors }
      : { ...DefaultTheme, colors: lightColors }
    : mode === 'dark'
      ? { ...DarkTheme, colors: darkColors }
      : { ...DefaultTheme, colors: lightColors };
};

/**
 * Applies status bar style and background color based on theme
 * @param {AppTheme} theme - The current app theme
 * @example
 * applyStatusBarTheme(theme);
 */
export const applyStatusBarTheme = (theme: AppTheme): void => {
  setStatusBarStyle(theme.dark ? 'light' : 'dark');

  const backgroundColor = theme.colors.background;
  setStatusBarBackgroundColor(backgroundColor, true);
};

/**
 * Loads theme preference from AsyncStorage
 * @returns {Promise<ThemeMode>} The saved theme preference or 'system' if not found
 * @example
 * const themePref = await loadThemePref();
 */
export const loadThemePref = async (): Promise<ThemeMode> => {
  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const themeMode: ThemeMode = 'system';
      await saveThemePref(themeMode);
      return themeMode;
    }
    return saved as ThemeMode;
  } catch (error) {
    console.error('Error loading theme:', error);
    return 'system';
  }
};

/**
 * Saves theme preference to AsyncStorage
 * @param {ThemeMode} mode - Theme mode to save
 * @returns {Promise<void>}
 * @example
 * await saveThemePref('dark');
 */
export const saveThemePref = async (mode: ThemeMode): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, mode);
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};
