import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeOption from './ThemeOption';
import useStyles from '@/utils/useStyles';
import ThemedView from '../ui/ThemedView';
import useTheme from '@/utils/useTheme';

const THEME_KEY = 'APP_THEME_PREFERENCE';

export default function ThemeSettings() {
  const { updateThemePreference, isThemeLoaded } = useTheme();

  const [selectedPreference, setSelectedPreference] = useState<
    'light' | 'dark' | 'system'
  >('system');

  const styles = useStyles((theme) => ({
    container: {
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.border,
      maxHeight: 250,
    },
  }));

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
