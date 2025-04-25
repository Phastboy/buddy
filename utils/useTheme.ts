import { ThemeContext, ThemeContextType } from '@/components/theme/ThemeProvider';
import { useContext } from 'react';

/**
 * Custom hook to access theme context
 * @returns {ThemeContextType} Theme context values
 * @throws {Error} If used outside of ThemeProvider
 * @example
 * const { theme, mode, setMode } = useAppTheme();
 *
 * // To change theme mode:
 * setMode('dark');
 *
 * // To use theme colors:
 * <View style={{ backgroundColor: theme.colors.primary }} />
 */
export const useAppTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error('useAppTheme must be used within ThemeProvider');
  return context;
};
