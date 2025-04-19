import React, { useEffect, useState } from 'react';
import useTheme from '@/hooks/useTheme';
import ThemeOption from '../ThemeOption';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = 'APP_THEME_PREFERENCE';

export default function ThemeSettings() {
  const { updateThemePreference, colors, isThemeLoaded } = useTheme();
  const [selectedPreference, setSelectedPreference] = useState<
    'light' | 'dark' | 'system'
  >('system');

  useEffect(() => {
    const loadPreference = async () => {
      const stored = await AsyncStorage.getItem(THEME_KEY);
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setSelectedPreference(stored);
      }
    };

    if (isThemeLoaded) loadPreference();
  }, [isThemeLoaded]);

  const handleUpdate = (preference: 'light' | 'dark' | 'system') => {
    setSelectedPreference(preference);
    updateThemePreference(preference);
  };

  return (
    <View style={[styles.container, { borderColor: colors.border }]}>
      <View style={[styles.optionContainer, { backgroundColor: colors.card }]}>
        <ThemeOption
          title="Light"
          icon="sunny-outline"
          onPress={() => handleUpdate('light')}
          isActive={selectedPreference === 'light'}
        />
      </View>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      <View style={[styles.optionContainer, { backgroundColor: colors.card }]}>
        <ThemeOption
          title="Dark"
          icon="moon-outline"
          onPress={() => handleUpdate('dark')}
          isActive={selectedPreference === 'dark'}
        />
      </View>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      <View style={[styles.optionContainer, { backgroundColor: colors.card }]}>
        <ThemeOption
          title="System"
          icon="desktop-outline"
          onPress={() => handleUpdate('system')}
          isActive={selectedPreference === 'system'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginVertical: 16,
  },
  optionContainer: {
    paddingHorizontal: 16,
  },
  divider: {
    height: 1,
    width: '100%',
  },
});
