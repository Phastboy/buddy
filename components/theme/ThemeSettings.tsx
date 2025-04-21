import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeOption from './ThemeOption';
import ThemedView from '../ui/ThemedView';
import useTheme from '@/utils/useTheme';
import { StyleSheet } from 'react-native';

const THEME_KEY = 'APP_THEME_PREFERENCE';

export default function ThemeSettings() {
  const { colors } = useTheme();
  const { updateThemePreference, isThemeLoaded } = useTheme();

  const [selectedPreference, setSelectedPreference] = useState<
    'light' | 'dark' | 'system'
  >('system');

  const styles = StyleSheet.create({
    container: {
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      maxHeight: 250,
    },
  });

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
    <ThemedView style={styles.container}>
      <ThemeOption
        title="Light"
        icon="sunny-outline"
        onPress={() => handleUpdate('light')}
        isActive={selectedPreference === 'light'}
      />

      <ThemeOption
        title="Dark"
        icon="moon-outline"
        onPress={() => handleUpdate('dark')}
        isActive={selectedPreference === 'dark'}
      />

      <ThemeOption
        title="System"
        icon="desktop-outline"
        onPress={() => handleUpdate('system')}
        isActive={selectedPreference === 'system'}
      />
    </ThemedView>
  );
}
