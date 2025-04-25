import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import {
  applyStatusBarTheme,
  getTheme,
  loadThemePref,
  saveThemePref,
  ThemeMode,
} from '@/utils/theme.utils';
import { AppTheme } from '@react-navigation/native';

/**
 * Theme context type definition
 */
export interface ThemeContextType {
  theme: AppTheme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isLoading: boolean;
}

/**
 * Context for managing theme preferences and state
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

/**
 * Theme provider component that manages theme state and provides it to children
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.ReactElement} Theme context provider
 * @example
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 */
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>('system');
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(getTheme('system', systemColorScheme));

  // Handle mode changes
  const handleSetMode = useCallback(
    async (newMode: ThemeMode) => {
      await saveThemePref(newMode);
      setMode(newMode);
      setTheme(getTheme(newMode, systemColorScheme));
    },
    [systemColorScheme],
  );

  // Initial load
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const pref = await loadThemePref();
      setMode(pref);
      const theme = getTheme(pref, systemColorScheme);
      applyStatusBarTheme(theme);
      setTheme(theme);
      setIsLoading(false);
    };
    load();
  }, []);

  // Update theme when system scheme changes
  useEffect(() => {
    if (!isLoading) {
      const theme = getTheme(mode, systemColorScheme);
      applyStatusBarTheme(theme);
      setTheme(theme);
    }
  }, [systemColorScheme, mode, isLoading]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        mode,
        setMode: handleSetMode,
        isLoading,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
