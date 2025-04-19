import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setStatusBarStyle } from 'expo-status-bar';

type ThemePreference = 'light' | 'dark' | 'system';
type EffectiveTheme = 'light' | 'dark';
const THEME_KEY = 'APP_THEME_PREFERENCE';

interface IThemeContext {
  theme: EffectiveTheme;
  updateThemePreference: (preference: ThemePreference) => void;
  isThemeLoaded: boolean;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: 'dark',
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
  const [theme, setTheme] = useState<EffectiveTheme>('dark');
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  const getEffectiveTheme = (preference: ThemePreference): EffectiveTheme => {
    if (preference === 'system') {
      return systemColorScheme || 'dark';
    }
    return preference;
  };

  const updateStatusBar = (theme: EffectiveTheme) => {
    setStatusBarStyle(theme === 'dark' ? 'light' : 'dark');
  };

  const applyTheme = (preference: ThemePreference) => {
    const effective = getEffectiveTheme(preference);
    setTheme(effective);
    updateStatusBar(effective);
  };

  const persistAndSetPreference = async (preference: ThemePreference) => {
    try {
      setThemePreference(preference);
      applyTheme(preference);
      await AsyncStorage.setItem(THEME_KEY, preference);
    } catch (error) {
      console.error('Failed to save theme preference', error);
    }
  };

  const updateThemePreference = (preference: ThemePreference) => {
    persistAndSetPreference(preference);
  };

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const saved = await AsyncStorage.getItem(THEME_KEY);
        const preference: ThemePreference =
          saved === 'light' || saved === 'dark' || saved === 'system'
            ? saved
            : 'system';

        setThemePreference(preference);
        applyTheme(preference);
      } catch (error) {
        console.error('Failed to load theme', error);
      } finally {
        setIsThemeLoaded(true);
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    if (themePreference === 'system') {
      applyTheme('system');
    }
  }, [systemColorScheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        updateThemePreference,
        isThemeLoaded,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
