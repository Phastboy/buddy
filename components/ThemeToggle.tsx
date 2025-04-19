// components/ThemeToggle.tsx
import { Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import useTheme from '@/hooks/useTheme';

export default function ThemeToggle() {
  const { colors, themePreference, updateThemePreference } = useTheme();

  const toggleTheme = () => {
    const newPref = themePreference === 'light' ? 'dark' : 'light';
    updateThemePreference(newPref);
  };

  return (
    <Pressable onPress={toggleTheme} style={styles.button}>
      <Ionicons
        name={themePreference === 'light' ? 'moon-outline' : 'sunny-outline'}
        size={24}
        color={colors.text}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 24,
  },
});
