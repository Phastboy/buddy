import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setStatusBarStyle } from 'expo-status-bar';

type ThemePreference = 'light' | 'dark' | 'system';
type EffectiveTheme = 'light' | 'dark';
const THEME_KEY = 'APP_THEME_PREFERENCE';

interface IThemeContext {
  theme: EffectiveTheme;
  themePreference: ThemePreference;
  updateThemePreference: (preference: ThemePreference) => void;
  isThemeLoaded: boolean;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: 'dark',
  themePreference: 'system',
  updateThemePreference: () => {},
  isThemeLoaded: false,
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const systemColorScheme = useColorScheme();
  const [themePreference, setThemePreference] =
    useState<ThemePreference>('system');
  const [theme, setTheme] = useState<EffectiveTheme>(
    systemColorScheme || 'dark',
  );
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  const getEffectiveTheme = useCallback(
    (preference: ThemePreference): EffectiveTheme => {
      return preference === 'system' ? systemColorScheme || 'dark' : preference;
    },
    [systemColorScheme],
  );

  const updateStatusBar = useCallback((theme: EffectiveTheme) => {
    setStatusBarStyle(theme === 'dark' ? 'light' : 'dark');
  }, []);

  const applyTheme = useCallback(
    (preference: ThemePreference) => {
      const effective = getEffectiveTheme(preference);
      setTheme(effective);
      updateStatusBar(effective);
    },
    [getEffectiveTheme, updateStatusBar],
  );

  const persistAndSetPreference = useCallback(
    async (preference: ThemePreference) => {
      try {
        setThemePreference(preference);
        applyTheme(preference);
        await AsyncStorage.setItem(THEME_KEY, preference);
      } catch (error) {
        console.error('Failed to save theme preference', error);
      }
    },
    [applyTheme],
  );

  const updateThemePreference = useCallback(
    (preference: ThemePreference) => {
      persistAndSetPreference(preference);
    },
    [persistAndSetPreference],
  );

  const loadTheme = async () => {
    try {
      const saved = await AsyncStorage.getItem(THEME_KEY);
      const preference: ThemePreference =
        saved === 'light' || saved === 'dark' || saved === 'system'
          ? saved
          : 'system';

      setThemePreference(preference);
      setTheme(getEffectiveTheme(preference));
      updateStatusBar(getEffectiveTheme(preference));
    } catch (error) {
      console.error('Failed to load theme', error);
    } finally {
      setIsThemeLoaded(true);
    }
  };

  useEffect(() => {
    loadTheme();
  }, [getEffectiveTheme, updateStatusBar]);

  useEffect(() => {
    if (themePreference === 'system') {
      applyTheme('system');
    }
  }, [systemColorScheme, themePreference, applyTheme]);

  if (!isThemeLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themePreference,
        updateThemePreference,
        isThemeLoaded,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
