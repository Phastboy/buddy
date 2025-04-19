import { ThemeContext } from '@/components/ThemeContext';
import { themes } from '@/theme';
import { useContext } from 'react';

export default function useTheme() {
  const { theme, themePreference, updateThemePreference, isThemeLoaded } =
    useContext(ThemeContext);
  const colors = themes[theme];

  return {
    colors,
    theme,
    themePreference,
    updateThemePreference,
    isThemeLoaded,
  };
}
