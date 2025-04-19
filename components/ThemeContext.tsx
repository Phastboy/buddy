import React, { createContext, useState, useEffect } from 'react';
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
  const [currentTheme, setCurrentTheme] = useState<EffectiveTheme>('dark');
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  // Determine effective theme based on preference and system
  const getEffectiveTheme = (preference: ThemePreference): EffectiveTheme => {
    if (preference === 'system') {
      return systemColorScheme || 'dark';
    }
    return preference;
  };

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedPreference = await AsyncStorage.getItem(THEME_KEY);
        let preference: ThemePreference = 'system';

        if (
          savedPreference === 'light' ||
          savedPreference === 'dark' ||
          savedPreference === 'system'
        ) {
          preference = savedPreference;
        }

        setThemePreference(preference);
        setCurrentTheme(getEffectiveTheme(preference));
        updateStatusBar(getEffectiveTheme(preference));
      } catch (error) {
        console.error('Failed to load theme', error);
      } finally {
        setIsThemeLoaded(true);
      }
    };

    loadTheme();
  }, []);

  // Update theme when system color scheme changes (only if preference is 'system')
  useEffect(() => {
    if (themePreference === 'system') {
      const effectiveTheme = getEffectiveTheme(themePreference);
      setCurrentTheme(effectiveTheme);
      updateStatusBar(effectiveTheme);
    }
  }, [systemColorScheme, themePreference]);

  const updateStatusBar = (theme: EffectiveTheme) => {
    setStatusBarStyle(theme === 'dark' ? 'light' : 'dark');
  };

  const persistAndSetPreference = async (preference: ThemePreference) => {
    try {
      setThemePreference(preference);
      const effectiveTheme = getEffectiveTheme(preference);
      setCurrentTheme(effectiveTheme);
      updateStatusBar(effectiveTheme);
      await AsyncStorage.setItem(THEME_KEY, preference);
    } catch (error) {
      console.error('Failed to save theme preference', error);
    }
  };

  const updateThemePreference = (preference: ThemePreference) => {
    persistAndSetPreference(preference);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        themePreference,
        updateThemePreference,
        isThemeLoaded,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
