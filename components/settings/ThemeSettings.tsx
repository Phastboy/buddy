import useTheme from '@/hooks/useTheme';
import ThemeOption from '../ThemeOption';
import { View, StyleSheet } from 'react-native';

export default function ThemeSettings() {
  const { themePreference, updateThemePreference, colors } = useTheme();

  return (
    <View style={[styles.container, { borderColor: colors.border }]}>
      <View style={[styles.optionContainer, { backgroundColor: colors.card }]}>
        <ThemeOption
          title="Light"
          icon="sunny-outline"
          onPress={() => updateThemePreference('light')}
          isActive={themePreference === 'light'}
        />
      </View>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      <View style={[styles.optionContainer, { backgroundColor: colors.card }]}>
        <ThemeOption
          title="Dark"
          icon="moon-outline"
          onPress={() => updateThemePreference('dark')}
          isActive={themePreference === 'dark'}
        />
      </View>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      <View style={[styles.optionContainer, { backgroundColor: colors.card }]}>
        <ThemeOption
          title="System"
          icon="desktop-outline"
          onPress={() => updateThemePreference('system')}
          isActive={themePreference === 'system'}
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
