import { ThemeContext } from '@/components/ThemeContext';
import { themes } from '@/theme';
import { useContext } from 'react';

export default function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const { theme, themePreference, updateThemePreference, isThemeLoaded } =
    context;
  const colors = themes[theme];

  return {
    colors,
    theme,
    themePreference,
    updateThemePreference,
    isThemeLoaded,
  };
}
