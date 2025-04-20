import { ThemeContext } from '@/components/ThemeContext';
import { useContext } from 'react';

export default function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const {
    colors,
    theme,
    themePreference,
    updateThemePreference,
    isThemeLoaded,
  } = context;

  return {
    colors,
    theme,
    themePreference,
    updateThemePreference,
    isThemeLoaded,
  };
}
