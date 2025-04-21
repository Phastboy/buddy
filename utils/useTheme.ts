import { ThemeContext } from '@/components/theme/ThemeContext';
import { useContext } from 'react';

export default function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const { colors, ...rest } = context;

  return {
    colors,
    ...rest,
  };
}
